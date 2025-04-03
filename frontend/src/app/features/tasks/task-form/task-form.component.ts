import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../../shared/alert-dialog/alert-dialog.component';

import { UserService } from '../../../services/user.service';
import { TaskService } from '../../../services/task.service';


@Component({
  selector: 'app-task-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent implements OnInit{
  taskForm: FormGroup;
  users = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'María López' },
    { id: 3, name: 'Carlos Ramírez' },
  ];

  buttonDisabled = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private taskService: TaskService,
    private dialog: MatDialog
  ) {
    this.taskForm = this.fb.group({
      userId: ['', Validators.required],
      title: ['', Validators.required],
      description: [''],
      priority: ['Media', Validators.required],
      status: ['pendiente', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        console.log("listado usuarios", data);
        this.users = data
      },
      error: (error) => console.error('Error al obtener usuarios:', error)
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      console.log('Tarea asignada:', this.taskForm.value);
      this.buttonDisabled = true;
      this.taskService.createTask(this.taskForm.value).subscribe({
        next: (response) => {
          console.log('Usuario creado:', response);
          //alert('Usuario creado con éxito');
          this.dialog.open(AlertDialogComponent, {
            data: { message: 'Tarea creada exitosamente' },
          });
          this.taskForm.reset();
          this.buttonDisabled = false;
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          //alert('Error al crear usuario');
          this.dialog.open(AlertDialogComponent, {
            data: {
              icon: 'error',
              title: 'ERROR!',
              message: 'Error al crear la tarea',
            },
          });
          this.buttonDisabled = false;
        },
      });
    }
  }
}

import { Component } from '@angular/core';

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

interface Rol {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  userForm: FormGroup;

  roles: Rol[] = [
    { value: 'desarrollador', viewValue: 'Desarrollador' },
    { value: 'lider', viewValue: 'Líder Técnico' },
    { value: 'administrador', viewValue: 'Administrador' },
  ];

  buttonDisabled = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Usuario creado:', this.userForm.value);
      this.buttonDisabled = true;
      this.userService.createUser(this.userForm.value).subscribe({
        next: (response) => {
          console.log('Usuario creado:', response);
          //alert('Usuario creado con éxito');
          this.dialog.open(AlertDialogComponent, {
            data: { message: 'Usuario creado exitosamente' },
          });
          this.userForm.reset();
          this.buttonDisabled = false;
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          //alert('Error al crear usuario');
          this.dialog.open(AlertDialogComponent, {
            data: {
              icon: 'error',
              title: 'ERROR!',
              message: 'Error al crear el usuario',
            },
          });
          this.buttonDisabled = false;
        },
      });
    }
  }
}

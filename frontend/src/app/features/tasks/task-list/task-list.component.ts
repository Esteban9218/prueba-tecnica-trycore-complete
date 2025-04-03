import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { UserService } from '../../../services/user.service';
import { TaskService } from '../../../services/task.service';
import { TaskNotifierService } from '../../../services/task-notifier.service';

interface Task {
  id: number;
  userId: number;
  description: string;
  priority: 'Alta' | 'Media' | 'Baja';
  status: 'pendiente' | 'en-progreso' | 'completada';
}

@Component({
  selector: 'app-task-list',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatChipsModule,
    MatIcon,
    MatMenuModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  users = [
    { id: 1, name: 'Juan Pérez' },
    { id: 2, name: 'María González' },
  ];

  displayedColumns: string[] = [
    'user',
    'description',
    'priority',
    'status',
    'actions',
  ];

  // tasks: Task[] = [
  //   {
  //     id: 1,
  //     userId: 1,
  //     description: 'Revisar el servidor',
  //     priority: 'Alta',
  //     status: 'pendiente',
  //   },
  //   {
  //     id: 2,
  //     userId: 2,
  //     description: 'Actualizar documentación',
  //     priority: 'Media',
  //     status: 'en-progreso',
  //   },
  //   {
  //     id: 3,
  //     userId: 3,
  //     description: 'Actualizar documentación',
  //     priority: 'Baja',
  //     status: 'completada',
  //   },
  // ];
  
  tasks: Task[] = [];

  estados = [
    { value: 'pendiente', viewValue: 'Pendiente' },
    { value: 'en-progreso', viewValue: 'En Progreso' },
    { value: 'completada', viewValue: 'Completada' },
  ];

  filteredTasks: Task[] = [...this.tasks];
  selectedUser: string = '';
  selectedStatus: string = '';

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private taskNotifier: TaskNotifierService,
  ) {
    this.filterTasks();
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (data: any) => {
        console.log('listado usuarios', data);
        this.users = data;
      },
      error: (error) => console.error('Error al obtener usuarios:', error),
    });

    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
        console.log('listado tareas', data);
        this.tasks = [...data];
        this.filterTasks();
      },
      error: (error) => console.error('Error al obtener tareas:', error),
    });

    // Simula la suscripción de los líderes técnicos
    this.taskNotifier.addObserver((message: string) => {
      console.log('Notificación para Líder Técnico:', message);
      alert(`Líder Técnico Notificado: ${message}`);
    });
  }

  getUserName(userId: number) {
    return this.users.find((user) => user.id === userId)?.name || 'Desconocido';
  }

  showStatus(status: string) {
    let estado = this.estados.find((e) => e.value === status);
    if (estado) {
      return estado.viewValue;
    }
    return '';
  }

  getPriorityColor(priority: string) {
    switch (priority) {
      case 'Alta':
        return 'red';
      case 'Media':
        return 'yellow';
      case 'Baja':
        return 'green';
      default:
        return 'white';
    }
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter((task) => {
      return (
        (!this.selectedUser || task.userId === +this.selectedUser) &&
        (!this.selectedStatus || task.status === this.selectedStatus)
      );
    });
  }

  onEstadoChange(task: any, newStatus: string) {
    console.log(
      `Estado cambiado para la tarea ${task.id}: ${task.status}`,
      newStatus
    );

    const updatedTask = { ...task, status: newStatus };

    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: (response) => {
        console.log('Tarea actualizada:', response);
        task.status = newStatus; // Actualiza en la UI directamente
      },
      error: (error) => console.error('Error al actualizar tarea:', error),
    });
  }

  
}

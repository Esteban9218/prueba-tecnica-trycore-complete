import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TaskNotifierService } from './task-notifier.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  //private apiUrl = 'https://apimocha.com/task-manager-esteban';
  private apiUrl = "http://localhost:9090";

  constructor(private http: HttpClient, private taskNotifier: TaskNotifierService) {}

  // Método para crear una tarea (POST)
  createTask(taskData: any): Observable<any> {
    //return this.http.post(`${this.apiUrl}/create-task`, taskData);
    return this.http.post(`${this.apiUrl}/tasks`, taskData);
  }

  // Método para obtener todas las tareas (GET)
  getTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasks`);
  }

  // Método para actualizar una tarea
  updateTask(taskId: number, updatedData: any) {
    // Se debe reemplazar
    //return this.http.put(`${this.apiUrl}/update-task/${taskId}`, updatedData);
    //return this.http.put(`${this.apiUrl}/update-task`, updatedData).pipe(
    return this.http.put(`${this.apiUrl}/tasks/${taskId}`, updatedData).pipe(
      tap(() => {
        console.log(`Tarea ${taskId} actualizada a: ${updatedData.status}`);
        if (updatedData.status === 'completada') {
          this.taskNotifier.notify(`La tarea con ID ${taskId} ha sido completada.`);
        }
      })
    );
  }

}

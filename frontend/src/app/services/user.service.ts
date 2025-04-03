import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //private apiUrl = 'https://apimocha.com/task-manager-esteban';
  private apiUrl = "http://localhost:9090";

  constructor(private http: HttpClient) {}

  // Método para crear un usuario (POST)
  createUser(userData: any): Observable<any> {
    //return this.http.post(`${this.apiUrl}/create-user`, userData);
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  // Método para obtener todos los usuarios (GET)
  getUsers(): Observable<any> {
    //return this.http.get(`${this.apiUrl}/users`);
    return this.http.get(`${this.apiUrl}/users`);
  }
}

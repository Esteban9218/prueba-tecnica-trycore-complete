import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskNotifierService {
  private observers: ((message: string) => void)[] = [];

  // Método para registrar un observador
  addObserver(observer: (message: string) => void) {
    this.observers.push(observer);
  }

  // Método para notificar a los observadores
  notify(message: string) {
    this.observers.forEach(observer => observer(message));
  }
}

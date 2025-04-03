import { Routes } from "@angular/router";

import { importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";


import { UserFormComponent } from "./features/users/user-form/user-form.component";
import { TaskFormComponent } from "./features/tasks/task-form/task-form.component";
import { TaskListComponent } from "./features/tasks/task-list/task-list.component";


export const routes: Routes = [
  { path: "", redirectTo: "tasks", pathMatch: "full" }, // Redirigir a tareas por defecto
  { path: "users/create", component: UserFormComponent },
  { path: "tasks/create", component: TaskFormComponent },
  { path: "tasks", component: TaskListComponent }, // Vista para listar tareas
  { path: "**", redirectTo: "tasks" }, // Redirigir a tareas si no se encuentra la ruta
];

export const appRoutingProviders = [provideRouter(routes)];

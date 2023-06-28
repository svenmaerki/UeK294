import { Routes } from '@angular/router';
import { NotFoundComponent } from './base/not-found/not-found.component';
import { Constants } from './data/constants';
import { HomeComponent } from './base/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { UnauthorizedComponent } from './base/unauthorized/unauthorized.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoFormComponent } from './todo/todo-form/todo-form.component';

export const routes: Routes = [
  { path: Constants.routes.home, component: HomeComponent },
  { path: Constants.routes.login, component: LoginComponent },
  { path: Constants.routes.unauthorized, component: UnauthorizedComponent },
  {
    path: Constants.routes.todoList,
    component: TodoListComponent,
    // TODO: Add LoggedInGuard
  },
  {
    path: Constants.routes.todoNew,
    component: TodoFormComponent,
    // TODO: Add LoggedInGuard
  },
  {
    path: Constants.routes.todoEdit,
    component: TodoFormComponent,
    // TODO: Add LoggedInGuard
  },
  { path: '**', component: NotFoundComponent },
];

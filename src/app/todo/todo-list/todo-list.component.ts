import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { TodoService } from '../service/todo.service';
import { TodoDto } from '../dto/todo.dto';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Constants } from '../../data/constants';
import { AuthService } from '../../auth/service/auth.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatProgressBarModule,
    MatIconModule,
    RouterLink,
    MatCheckboxModule,
    MatDialogModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  protected readonly Constants = Constants;

  private readonly dialog = inject(MatDialog);
  protected readonly authService = inject(AuthService);
  protected readonly todoService = inject(TodoService);

  ngOnInit() {
    this.todoService.loadTodos();
  }

  protected openDeleteDialog(todo: TodoDto) {
    this.dialog.open(DeleteDialogComponent, {
      data: todo,
    });
  }
}

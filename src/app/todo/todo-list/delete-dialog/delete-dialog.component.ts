import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TodoService } from '../../service/todo.service';
import { TodoDto } from '../../dto/todo.dto';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-dialog.component.html',
})
export class DeleteDialogComponent {
  private dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  private readonly todoService = inject(TodoService);
  protected readonly todo = inject(MAT_DIALOG_DATA) as TodoDto;

  deleteTodo() {
    this.todoService.deleteTodoById(this.todo.id);
    this.dialogRef.close();
  }
}

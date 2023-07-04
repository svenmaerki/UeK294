import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Observable, of, take, tap } from 'rxjs';
import { TodoDto } from '../dto/todo.dto';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TodoService } from '../service/todo.service';
import { MatButtonModule } from '@angular/material/button';
import { Constants } from '../../data/constants';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { CreateTodoDto } from '../dto/create-todo.dto';

interface TodoForm {
  title: string;
  description: string;
  closed: boolean;
}

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent implements OnInit {
  protected form: UntypedFormGroup = new FormGroup({});
  protected readonly Constants = Constants;

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private todoService = inject(TodoService);

  protected todo$: Observable<TodoDto | undefined> | undefined = undefined;

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      closed: [false, [Validators.required]],
    });

    this.route.paramMap.pipe(take(1)).subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.todo$ = this.todoService.getTodoById(+id).pipe(
          // TODO: Handle error when using real API
          tap((todo) => {
            if (todo) {
              this.form.patchValue(todo);
            }
          })
        );
      } else {
        this.todo$ = of(this.form.value);
      }
    });
  }

  protected save(id: number | null = null) {
    const todoForm = this.form.value as TodoForm;
    if (id) {
      const updateTodo = this.mapToUpdateTodo(id, todoForm);
      this.todoService.updateTodoById(updateTodo);
    } else {
      const createTodo = this.mapToCreateTodo(todoForm);
      this.todoService.createTodo(createTodo);
    }

    this.router.navigateByUrl(Constants.routes.todo).finally();
  }

  private mapToUpdateTodo(id: number, todo: TodoForm): UpdateTodoDto {
    return {
      id,
      title: todo.title,
      description: todo.description,
      closed: todo.closed,
    };
  }

  private mapToCreateTodo(todo: TodoForm): CreateTodoDto {
    return {
      title: todo.title,
      description: todo.description,
    };
  }
}

import { Injectable } from '@angular/core';
import { Constants } from '../../data/constants';
import { Observable, of } from 'rxjs';
import { TodoDto } from '../dto/todo.dto';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoUrl = Constants.baseServerUrl + '/todo';
  private static MOCK_TODOS: TodoDto[] = [
    {
      id: 1,
      title: 'Todo 1',
      description: 'Description 1',
      closed: false,
    },
    {
      id: 2,
      title: 'Todo 2',
      description: 'Description 2',
      closed: false,
    },
    {
      id: 3,
      title: 'Todo 3',
      description: 'Description 3',
      closed: true,
    },
    {
      id: 4,
      title: 'Todo 4',
      description: 'Description 4',
      closed: false,
    },
    {
      id: 5,
      title: 'Todo 5',
      description: 'Description 5',
      closed: true,
    },
    {
      id: 6,
      title: 'Todo 6',
      description: 'Description 6',
      closed: true,
    },
    {
      id: 7,
      title: 'Todo 7',
      description: 'Description 7',
      closed: true,
    },
  ];

  public getTodos(): Observable<TodoDto[]> {
    return of(TodoService.MOCK_TODOS);
  }

  public getTodoById(id: number): Observable<TodoDto | null> {
    const todo = TodoService.MOCK_TODOS.find((t) => t.id === id);
    if (todo) {
      return of(todo);
    }
    return of(null);
  }

  public createTodo(todo: CreateTodoDto): void {
    const highestId = Math.max(...TodoService.MOCK_TODOS.map((t) => t.id));
    TodoService.MOCK_TODOS.push({
      ...todo,
      id: highestId + 1,
      closed: false,
    });
  }

  public updateTodoById(id: number, todo: UpdateTodoDto): void {
    const index = TodoService.MOCK_TODOS.findIndex((t) => t.id === id);
    if (index !== -1) {
      TodoService.MOCK_TODOS[index] = {
        ...TodoService.MOCK_TODOS[index],
        ...todo,
      };
    }
  }

  public deleteTodoById(id: number): void {
    const index = TodoService.MOCK_TODOS.findIndex((t) => t.id === id);
    if (index !== -1) {
      TodoService.MOCK_TODOS.splice(index, 1);
    }
  }
}

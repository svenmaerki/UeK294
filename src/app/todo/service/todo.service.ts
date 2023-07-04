import { inject, Injectable } from '@angular/core';
import { Constants } from '../../data/constants';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { TodoDto } from '../dto/todo.dto';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);
  private todoUrl = Constants.baseServerUrl + '/todo';

  private _todos$: BehaviorSubject<TodoDto[]> = new BehaviorSubject<TodoDto[]>(
    []
  );

  get todos$(): Observable<TodoDto[]> {
    return this._todos$.asObservable();
  }

  public loadTodos(): void {
    this.http.get<TodoDto[]>(this.todoUrl).subscribe({
      next: (todos) => {
        this._todos$.next(todos);
      },
      error: (err) => {
        this.showSnackBar('Fehler beim Laden der Todos', err);
      },
    });
  }

  public getTodoById(id: number): Observable<TodoDto | undefined> {
    const todo = this._todos$.value.find((todo) => todo.id === id);
    if (todo) {
      return of(todo);
    } else {
      this.showSnackBar('Todo nicht gefunden', {
        message: `Todo with ID ${id} not found`,
      });
    }
    return of(undefined);
  }

  public createTodo(createTodoDto: CreateTodoDto): void {
    this.http.post<TodoDto>(this.todoUrl, createTodoDto).subscribe({
      next: (todo) => {
        this._todos$.next([...this._todos$.value, todo]);
      },
      error: (err) => {
        this.showSnackBar('Fehler beim Erstellen des Todos', err);
      },
    });
  }

  public updateTodoById(updateTodoDto: UpdateTodoDto): void {
    this.http
      .put<TodoDto>(`${this.todoUrl}/${updateTodoDto.id}`, updateTodoDto)
      .subscribe({
        next: (todo) => {
          this._todos$.next(
            this._todos$.value.map((todo) =>
              todo.id === updateTodoDto.id ? todo : todo
            )
          );
        },
        error: (err) => {
          this.showSnackBar('Fehler beim Updaten des Todos', err);
        },
      });
  }

  public deleteTodoById(id: number): void {
    this.http.delete<void>(`${this.todoUrl}/${id}`).subscribe({
      next: () => {
        this._todos$.next(this._todos$.value.filter((todo) => todo.id !== id));
      },
      error: (err) => {
        this.showSnackBar('Fehler beim Löschen des Todos', err);
      },
    });
  }

  private showSnackBar(message: string, err: any): void {
    const errorMessage = `${message}: ${err.message}`;
    this.snackBar.open(errorMessage, 'OK', {
      duration: 5000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}

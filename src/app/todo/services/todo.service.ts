import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Todo } from '../models/todo';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  public getTodos() : Observable<Todo[]> {
    if (this.showCompleted) {
      return this.http.get<Todo[]>(`${environment.api}`);
    }
    else {
      return this.http.get<Todo[]>(`${environment.api}`).pipe(
      map((todos) => todos.filter((todo) => !todo.completed))
    );
    }
  }

  public addTodo(title: string) : Observable<Todo> {
    const body = { title: title };
    return this.http.post<Todo>(`${environment.api}`, body);
  }

  public updateTodo(todo: Todo) : Observable<Todo> {
    const body = { title: todo.title, completed: todo.completed };
    return this.http.put<Todo>(`${environment.api}/${todo.id}`, body);
  }

  public toggleShowCompleted() : void {
    this.showCompleted = !this.showCompleted
  }

  showCompleted: boolean = false;
  todos: Observable<Todo[]> = this.getTodos();
}

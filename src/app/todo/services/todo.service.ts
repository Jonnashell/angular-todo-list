import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  public getTodos() : Observable<Todo[]> {
    const result = this.http.get<Todo[]>(`${environment.api}`);
    console.log("Result: ", result);
    return result;
  }

  // public getTodosNotCompleted() : Observable<Todo[]> {
  //   return this.http.get<Todo[]>(`${environment.api}/todo`).pipe(
  //     map((todos) => todos.filter((todo) => !todo.completed))
  //   );
  // }

  public addTodo(title: string) : Observable<Todo> {
    const body = { title: title };
    return this.http.post<Todo>(`${environment.api}`, body);
  }

  public updateTodo(todo: Todo) : Observable<Todo> {
    console.log(todo);
    const body = { title: todo.title, completed: todo.completed };
    return this.http.put<Todo>(`${environment.api}/${todo.id}`, body);
  }
  todos: Observable<Todo[]> = this.getTodos();
}

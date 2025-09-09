import { Component, inject } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  private readonly router = inject(Router);

  todos = this.todoService.todos;
  showCompleted = this.todoService.showCompleted;
  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.todos = this.todoService.getTodos();
    this.todos.subscribe((ts) => {
      ts.forEach((t) => {
        console.log(t.title);
      })
    })
  }
  refreshTodos(): void {
    this.todos = this.todoService.getTodos();
  }

  toggleShowCompleted() : void {
    this.todoService.toggleShowCompleted();
    this.refreshTodos();
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe();
  }

  async newTodo(title: string) {
    this.todoService.addTodo(title).subscribe({
      next: (todo) => {
        console.log("Created todo:", todo);
        this.refreshTodos();
      },
      error: (err) => {
        console.error("Error creating todo:", err);
      }
    });
    this.todos = this.todoService.todos;
  }
}

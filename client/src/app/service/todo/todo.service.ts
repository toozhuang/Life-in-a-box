import { Injectable } from "@angular/core";
import { LifeHttpService } from "../core/life-http.service";
import { API } from "src/app/dataset/api.list";

@Injectable()
export class TodoService {
  constructor(private httpSercice: LifeHttpService) {}

  createTodo(todo) {
    return this.httpSercice.post({ taskList: todo }, API.todo.todo);
  }
  updateTodo(taskList) {
    return this.httpSercice.post({ taskList: taskList }, API.todo.todo);
  }

  task(name: string) {
    return this.httpSercice.get(API.todo.task + `/${name}`);
  }

  todolist(taskId: string) {
    return this.httpSercice.get(API.todo.todo + `/${taskId}/list`);
  }
}

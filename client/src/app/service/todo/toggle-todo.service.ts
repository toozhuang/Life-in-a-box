import { Injectable, EventEmitter } from "@angular/core";
import { TodoInterface } from "../interface/todo-list.interface";

@Injectable()
export class ToggleTodoService {
  public toggleEventListener: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  eventObv() {
    return this.toggleEventListener;
  }
  toogleEvent(todo: TodoInterface) {
    this.toggleEventListener.emit(todo);
  }
}

import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges
} from "@angular/core";
import { NzDrawerRef } from "ng-zorro-antd";
import { TodoService } from "src/app/service/todo/todo.service";
import { TInboxComponent } from "../t-inbox/t-inbox.component";
import { ToggleTodoService } from "src/app/service/todo/toggle-todo.service";
import { TodoInterface } from "src/app/service/interface/todo-list.interface";

import * as _ from "lodash";

@Component({
  selector: "app-slide-todo",
  templateUrl: "./slide-todo.component.html",
  styleUrls: ["./slide-todo.component.css"]
})
export class SlideTodoComponent implements OnInit, OnChanges {
  @Input()
  todoItem: TodoInterface;

  localTodoItem: TodoInterface;

  @Input()
  listId;

  checked: boolean = false;

  toggleTodo(event) {
    console.log(
      " toggle event : ",
      _.isEqual(this.todoItem, this.localTodoItem),
      this.todoItem,
      this.localTodoItem
    );
    // 检测如果有变化 就save
    // if (event != this.todoItem.title) {
    // this.todoItem.todoItem = event;
    if (!_.isEqual(this.todoItem, this.localTodoItem)) {
      this.save();
    } else {
      console.log("nothing change ");
    }
    // }
  }

  save() {
    this.todoservice.updateTodo(this.localTodoItem).subscribe((result: any) => {
      if (result.status == 200) {
        console.log("emit toggle event");

        this.toggleEvent.toogleEvent(this.localTodoItem);
        this.todoItem = { ...this.todoItem, ...this.localTodoItem };
      }
    });
  }

  constructor(
    private toggleEvent: ToggleTodoService,
    private todoservice: TodoService,
    private drawerRef: NzDrawerRef<any>
  ) {}

  close(): void {
    // this.drawerRef.close(this.value);
  }
  ngOnInit() {
    this.localTodoItem = {
      ...{},
      ...this.todoItem
    };
    // console.log(this.localTodoItem, this.todoItem);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("change happen here: ", changes);
  }
}

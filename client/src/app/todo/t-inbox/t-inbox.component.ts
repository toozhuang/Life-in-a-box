import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { TodoService } from "src/app/service/todo/todo.service";
import {
  TodoListInterface,
  TaskList,
  TodoInterface
} from "src/app/service/interface/todo-list.interface";
import { SlideTodoComponent } from "../slide-todo/slide-todo.component";
import { NzDrawerService } from "ng-zorro-antd";
import { ToggleTodoService } from "src/app/service/todo/toggle-todo.service";

import * as _ from "lodash";

@Component({
  selector: "app-inbox",
  templateUrl: "./t-inbox.component.html",
  styleUrls: ["./t-inbox.component.css"]
})
export class TInboxComponent implements OnInit, OnChanges {
  public inboxList: TodoInterface[] = [];

  visible = false;
  isVisibleMiddle = false;
  taskID;

  displayArchieve = false;

  @ViewChild("todo")
  todo;

  toggleTodo(todo: TodoInterface) {
    this.inboxService
      .updateTodo({ ...todo, ...{ status: !todo.status } })
      .subscribe((result: any) => {
        if (result.status == 200) {
          todo.status = !todo.status;
        }
      });

    console.log("todo.status", todo.status, {
      ...todo,
      ...{ status: !todo.status }
    });
  }

  openComponent(todoItem: TaskList): void {
    const drawerRef = this.drawerService.create<SlideTodoComponent>({
      nzContent: SlideTodoComponent,
      nzWidth: 370,
      nzContentParams: {
        todoItem
      }
    });
    drawerRef.afterOpen.subscribe(() => {
      console.log("Drawer(Component) open");
    });
    drawerRef.afterClose.subscribe(data => {
      console.log(data);
      if (typeof data === "string") {
        // this.value = data;
      }
    });
  }

  showModalMiddle(): void {
    this.isVisibleMiddle = true;
  }

  handleOkMiddle(): void {
    console.log("click ok");
    this.isVisibleMiddle = false;
  }

  handleCancelMiddle(): void {
    this.isVisibleMiddle = false;
  }

  createTodo(value) {
    console.log(value);
    let todo = {
      title: value,
      taskId: this.taskID,
      status: false
    };

    this.inboxService.createTodo(todo).subscribe((result: any) => {
      console.log(" have a todo", result);
      if (result.status === 200) {
        this.inboxList = [...this.inboxList, result.todo];
        console.log(this.todo);
        this.todo.nativeElement.value = "";
        // _.orderBy(this.inboxList, ["createdAt"], ["asc"]);
      }
    });
  }

  demo(event) {
    console.log("trigger", event);
  }

  constructor(
    private toggleService: ToggleTodoService,
    private drawerService: NzDrawerService,
    private inboxService: TodoService
  ) {}

  ngOnInit() {
    this.inboxService.task("inbox").subscribe((result: TodoInterface[]) => {
      console.log(result);
      // this.inboxList = result[0];
      this.taskID = result[0]._id;
      this.inboxService.todolist(result[0]._id).subscribe((resultss: any) => {
        console.log("--->", resultss);
        this.inboxList = resultss;
      });
    });

    this.toggleService.eventObv().subscribe((todo: TodoInterface) => {
      // value = value.todoTask;

      this.inboxList.forEach((item, index) => {
        // console.log(todo, item,);
        if (item._id === todo._id) {
          // this.table.data[index] = { ...this.inboxList[index], ...todo };
          this.inboxList = [
            ...this.inboxList.slice(0, index),
            todo,
            ...this.inboxList.slice(index + 1)
          ];
        }
      });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("change happen here: ", changes);
  }
}

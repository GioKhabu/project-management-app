import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/boards.service';
import { ColumnsService } from 'src/app/columns.services';
import { TasksService } from 'src/app/tasks.service';
import { Column } from '../column.model';
import { Task } from '../task.model';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css'],
})
export class AddNewTaskComponent implements OnInit {
  @Input() task: Task
  editTask: boolean;
  columnIndex: string;
  boardIndex: string;
  boardID: string[] = [];
  loadedBoards: Column[] = [];

  constructor(
    private boardService: BoardService,
    private columnsService: ColumnsService,
    private tasksService: TasksService
  ) {
    this.tasksService.updateTaskName.subscribe(
      (editBoardVal: boolean) => (this.editTask = editBoardVal)
    );
    this.tasksService.passColumnIndex.subscribe(
      (id: string) => (this.columnIndex = id)
    );
  }

  ngOnInit(): void {
    this.boardID = this.boardService.getIds();
  }

  // onNewTaskInput(inputEl1: HTMLInputElement, inputEl2: HTMLInputElement) {
  //   this.columnsService.patchData(
  //     inputEl1.value,
  //     inputEl2.value,
  //     this.columnIndex
  //   );
  //   console.log(this.columnIndex);
  //   console.log(inputEl1.value);
  // }

  onNewColumn(postData: Task) {
    if (postData.name !== '') {
      this.tasksService.newTask(
        postData.name,
        postData.description,
        (postData.boardID = this.boardID[0]),
        (postData.columnID = this.columnIndex)
      );
    }
  }

  onCancel() {
    this.tasksService.updateTaskName.emit(false);
  }
}

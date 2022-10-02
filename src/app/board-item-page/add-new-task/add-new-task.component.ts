import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  @Input() task: Task;
  editTask: boolean;
  columnIndex: string;
  boardIndex: string;
  boardID: string[] = [];
  loadedBoards: Column[] = [];

  constructor(
    private boardService: BoardService,
    private tasksService: TasksService,
    private formBuilder: FormBuilder
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

  taskForm = this.formBuilder.group({
    name: [''],
    description: [''],
    boardID: [''],
    columnID: [''],
    id: [''],
  });

  onNewColumn(postData: Task) {
    if (this.taskForm.value.name !== '') {
      this.tasksService.newTask(
        this.taskForm.value.name,
        this.taskForm.value.description,
        (postData.boardID = this.boardID[0]),
        (postData.columnID = this.columnIndex)
      );
    }
  }

  onCancel() {
    this.tasksService.updateTaskName.emit(false);
  }
}

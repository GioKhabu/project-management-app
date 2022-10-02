import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from 'src/app/tasks.service';
import { Task } from '../task.model';
import { MatDialog } from '@angular/material/dialog';
import { TaskDeletePopUpComponent } from './task-delete-pop-up/task-delete-pop-up.component';
import { EditTasksComponent } from './edit-tasks/edit-tasks.component';



@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() task: Task;

  constructor(
    private tasksService: TasksService,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {}

  onDeleteTaskClick(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dialogRef.open(TaskDeletePopUpComponent, {
      width: '280px',
      height: '150px',
      panelClass: 'my-css-class',
      data: {
        id: this.task.id,
        name: this.task.name,
      },
    });
  }

  onEditTask(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dialogRef.open(EditTasksComponent, {
      width: '280px',
      height: '150px',
      panelClass: 'my-css-class',
      data: {
        id: this.task.id,
        name: this.task.name,
      },
    });
    this.tasksService.passTaskIndex.emit(this.task.id);
    this.tasksService.updateTask.emit(true);
    this.tasksService.passTasksInfo.emit(this.task)
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TasksService } from 'src/app/tasks.service';



@Component({
  selector: 'app-task-delete-pop-up',
  templateUrl: './task-delete-pop-up.component.html',
  styleUrls: ['./task-delete-pop-up.component.css'],
})
export class TaskDeletePopUpComponent implements OnInit {
  taskId: string
  name:string
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private tasksService: TasksService
  ) {
    this.taskId = data.id
    this.name = data.name
  }

  ngOnInit(): void {}

  onDeleteTask(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.tasksService.deleteTask(this.taskId).subscribe(() => {});
  }
}

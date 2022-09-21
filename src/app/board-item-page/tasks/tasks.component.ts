import { Component, Input, OnInit } from '@angular/core';
import { TasksService } from 'src/app/tasks.service';
import { Task } from '../task.model';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() task: Task;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {}

  onDeleteTask(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.tasksService.deleteTask(this.task.id).subscribe(() => {});
  }

  onEditColumn(event: any) {
    event.preventDefault();
    event.stopPropagation();
    // this.tasksService.updateTaskName.emit(true);
    this.tasksService.passTaskIndex.emit(this.task.id);
    this.tasksService.updateTask.emit(true)
  }
}

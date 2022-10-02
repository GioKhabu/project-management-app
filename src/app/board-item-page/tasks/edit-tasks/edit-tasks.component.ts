import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/tasks.service';
import { FormBuilder } from '@angular/forms';
import { Task } from '../../task.model';


@Component({
  selector: 'app-edit-tasks',
  templateUrl: './edit-tasks.component.html',
  styleUrls: ['./edit-tasks.component.css'],
})
export class EditTasksComponent implements OnInit {
  task: Task
  editTask: boolean;
  itemIndex: string;

  constructor(
    private tasksService: TasksService,
    private formBuilder: FormBuilder,

  ) {
    this.tasksService.updateTask.subscribe(
      (editBoardVal: boolean) => (this.editTask = editBoardVal)
    );
    this.tasksService.passTaskIndex.subscribe(
      (id: string) => (this.itemIndex = id)
    );
    this.tasksService.passTasksInfo.subscribe(
      (tasks: Task) => (this.task = tasks)
    );
  }

  ngOnInit(): void {}

  taskForm = this.formBuilder.group({
    name: [''],
    description: [''],
    boardID: [''],
    columnID: [''],
    id: [''],
  });

  onEditTask() {
    this.tasksService.patchData(
      this.taskForm.value.name,
      this.taskForm.value.description,
      this.itemIndex
    );
  }
}

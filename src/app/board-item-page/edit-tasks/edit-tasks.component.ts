import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/tasks.service';

@Component({
  selector: 'app-edit-tasks',
  templateUrl: './edit-tasks.component.html',
  styleUrls: ['./edit-tasks.component.css'],
})
export class EditTasksComponent implements OnInit {
  editTask: boolean;
  itemIndex: string;

  constructor(private tasksService: TasksService) {
    this.tasksService.updateTask.subscribe(
      (editBoardVal: boolean) => (this.editTask = editBoardVal)
    );
    this.tasksService.passTaskIndex.subscribe(
      (id: string) => (this.itemIndex = id)
    );
  }

  ngOnInit(): void {}

  onEditTask(inputEl1: HTMLInputElement, inputEl2: HTMLInputElement) {
    this.tasksService.patchData(inputEl1.value, inputEl2.value, this.itemIndex);
    console.log(this.itemIndex);
    console.log(inputEl1.value);
    console.log(inputEl2.value);

  }

  onCancel() {
    this.tasksService.updateTask.emit(false);
  }
}

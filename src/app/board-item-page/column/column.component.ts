import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Board } from 'src/app/board/board.model';
import { BoardService } from 'src/app/boards.service';
import { ColumnsService } from 'src/app/columns.services';
import { TasksService } from 'src/app/tasks.service';
import { Column } from '../column.model';
import { Task } from '../task.model';


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  @Input() column: Column;
  @Input() board: Board;
  @Input() itemIndex: number;
  @Input() loadedColumn: Column[]
  loadedTasks: Task[] = [];
  boardID: string[] = [];
  show: boolean;

  constructor(
    private boardService: BoardService,
    private columnsService: ColumnsService,
    private tasksService: TasksService
  ) {}
  singleBoard: Board[] = [];

  ngOnInit(): void {
    this.boardID = this.boardService.getIds();
    this.singleBoard = this.boardService.singleBoard;
    this.tasksService.refreshNeeded$.subscribe(() => {
      this.getAllTasks();
    });
    this.getAllTasks();
  }
  onDeleteColumn(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.columnsService.deleteColumn(this.column.id).subscribe(() => {});
  }
  onEditColumn(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.columnsService.updateColumnName.emit(true);
    this.columnsService.passColumnIndex.emit(this.column.id);
  }

  addNewTask(event: any) {
    // event.preventDefault();
    // event.stopPropagation();

    this.tasksService.updateTaskName.emit(true);
    this.tasksService.passBoardIndex.emit(this.column.boardID);
    this.tasksService.passColumnIndex.emit(this.column.id);

    console.log('column-' + this.column.id);
    console.log('board-' + this.column.boardID);
  }

  private getAllTasks() {
    this.loadedTasks.splice(0, this.loadedTasks.length);
    this.tasksService.fetchTask().subscribe((posts) => {
      posts.filter((posta) => {
        if (posta.boardID === this.boardID[0]) {
          this.loadedTasks.push(posta);
          // console.log(posta)
        }
      });
    });
  }

  // drop1(event: CdkDragDrop<Task[]>) {
  //   moveItemInArray(this.loadedTasks, event.previousIndex, event.currentIndex);
  //   console.log(event);
  // }


  drop1(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    console.log(event);
    
  }
}

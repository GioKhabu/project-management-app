import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { Board } from 'src/app/board/board.model';
import { BoardService } from 'src/app/boards.service';
import { ColumnsService } from 'src/app/columns.services';
import { TasksService } from 'src/app/tasks.service';
import { Column } from '../column.model';
import { Task } from '../task.model';
import { MatDialog } from '@angular/material/dialog';
import { ColumnDeletePopUpComponent } from './column-delete-pop-up/column-delete-pop-up.component';
import { AddNewTaskComponent } from '../add-new-task/add-new-task.component';


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent implements OnInit {
  task: Task;
  editColumn: boolean;

  @Input() itemIndex: number;
  @Input() itemIndex1: number;
  @Input() column: Column;
  @Input() board: Board;
  @Input() loadedColumn: Column[];
  clickedIndex: number[] = [];

  columnID: string[] = [];
  openDeletePopup: boolean = false;

  loadedTasks: Task[] = [];

  boardID: string[] = [];
  show: boolean;
  @Output() passTasks = new EventEmitter<Task[]>();

  constructor(
    private boardService: BoardService,
    private columnsService: ColumnsService,
    private tasksService: TasksService,
    private dialogRef: MatDialog
  ) {
    this.columnsService.updateColumnName.subscribe(
      (editBoardVal: boolean) => (this.editColumn = editBoardVal)
    );
  }

  singleBoard: Board[] = [];

  ngOnInit(): void {
    this.passTasks.emit(this.loadedTasks);
    this.boardID = this.boardService.getIds();
    this.singleBoard = this.boardService.singleBoard;
    this.column.editable = false;

    this.tasksService.refreshNeeded$.subscribe(() => {
      this.getAllTasks();
    });
    this.getAllTasks();
  }

  onEditColumn(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.clickedIndex.splice(0, this.clickedIndex.length);
    this.clickedIndex.push(this.itemIndex1);
    this.columnID.splice(0, this.columnID.length);
    this.columnID.push(this.column.id);
    this.column.editable = true;
    this.columnsService.updateColumnName.emit(true);
    this.columnsService.passColumnIndex.emit(this.column.id);
  }

  addNewTask(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.dialogRef.open(AddNewTaskComponent, {
      width: '280px',
      height: '150px',
      panelClass: 'my-css-class',
      data: {
        boardID: this.column.boardID,
        id: this.column.id,
      },
    });
    this.tasksService.passColumnIndex.emit(this.column.id);
  }

  private getAllTasks() {
    this.loadedTasks.splice(0, this.loadedTasks.length);
    this.tasksService.fetchTask().subscribe((posts) => {
      posts.filter((posta) => {
        if (
          posta.boardID === this.boardID[0] &&
          posta.columnID === this.column.id
        ) {
          this.loadedTasks.push(posta);
          this.loadedTasks = [...this.loadedTasks]
        }
      });
    });
  }

  onDeleteClick() {
    this.dialogRef.open(ColumnDeletePopUpComponent, {
      width: '280px',
      height: '150px',
      panelClass: 'my-css-class',
      data: {
        id: this.column.id,
        name: this.column.name,
      },
    });
  }

  drop1(event: CdkDragDrop<string[]>) {
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
  }
}

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Board } from '../board/board.model';
import { BoardService } from '../boards.service';
import { ColumnsService } from '../columns.services';
import { TasksService } from '../tasks.service';
import { Column } from './column.model';

@Component({
  selector: 'app-board-item-page',
  templateUrl: './board-item-page.component.html',
  styleUrls: ['./board-item-page.component.css'],
})
export class BoardItemPageComponent implements OnInit {
  singleBoard: any = [];
  loadedColumns: Column[] = [];
  boardID: string[] = [];
  loadedTasks: Task[];

  constructor(
    private boardService: BoardService,
    private columnsService: ColumnsService,
    private tasksService: TasksService,
    private cd: ChangeDetectorRef
  ) {}

  wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async passTasks(data: Task[]) {
    await this.wait(200);

    this.loadedTasks = data;
    await this.wait(200);
  }
  ngOnInit(): void {
    this.boardID = this.boardService.getIds();
    this.columnsService.refreshNeeded$.subscribe(() => {
      this.getAllColumns();
    });

    this.getAllColumns();
    this.getAllBoards();
  }

  private getAllBoards() {
    this.boardService.fetchSingleBoard(this.boardID[0]).subscribe((posts) => {
      this.singleBoard[0] = posts;
    });
  }

  private getAllColumns() {
    this.loadedColumns.splice(0, this.loadedColumns.length);
    this.columnsService.fetchColumn().subscribe((posts) => {
      posts.filter((posta) => {
        if (posta.boardID === this.boardID[0]) {
          this.loadedColumns.push(posta);
          this.loadedColumns = [...this.loadedColumns]
        }
      });
    });
  }

  drop(event: CdkDragDrop<Column[]>) {
    moveItemInArray(
      this.loadedColumns,
      event.previousIndex,
      event.currentIndex
    );
  }

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
  }


}

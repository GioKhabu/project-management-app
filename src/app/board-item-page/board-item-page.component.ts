import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Board } from '../board/board.model';
import { BoardService } from '../boards.service';
import { ColumnsService } from '../columns.services';
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

  constructor(
    private boardService: BoardService,
    private columnsService: ColumnsService
  ) {}

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
        }
      });
    });
  }
  

  drop(event: CdkDragDrop<Column[]>) {
    
    moveItemInArray(this.loadedColumns, event.previousIndex, event.currentIndex);
    console.log(event)
  }

  // drop(event: CdkDragDrop<Column[]>) {
  //   console.log(event)
  // }
}

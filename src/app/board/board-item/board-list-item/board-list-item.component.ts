import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/boards.service';
import { Board } from '../../board.model';

@Component({
  selector: 'app-board-list-item',
  templateUrl: './board-list-item.component.html',
  styleUrls: ['./board-list-item.component.css']
})
export class BoardListItemComponent implements OnInit {
 @Input() boards: Board
 @Input() itemIndex: number
 editBoard: false
  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
  }




    onDeleteBoard(event: any) {
      event.preventDefault()
      event.stopPropagation()
      this.boardService.deleteBoard(this.itemIndex)
    }

    onEditBoard(event: any) {
      event.preventDefault()
      event.stopPropagation()
      this.boardService.updateBoardname.emit(true)
      this.boardService.passBoardIndex.emit(this.itemIndex)
    }

    onSelect(feature: string) {
      this.boardService.boardPageLoad(feature)
    }

}

import { Component, Input, OnInit} from '@angular/core';
import { BoardService } from 'src/app/boards.service';
import { Board } from '../board.model';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.css']
})
export class BoardItemComponent implements OnInit {
  
  // boards: Board[]
  // @Input() itemIndex: number
  loadedBoards: Board[] = []

  constructor(private boardService: BoardService) { }


  ngOnInit(): void {
    this.boardService.refreshNeeded$.subscribe(() => {
this.getAllBoards()
    })
this.getAllBoards()

  }

  private getAllBoards() {
    this.boardService.fetchBoards().subscribe(
      posts => {
        this.loadedBoards = posts
        console.log(posts)
      }
    )
  }
    
}

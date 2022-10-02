import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/boards.service';
import {map} from 'rxjs/operators'
import { Board } from '../../board.model';

@Component({
  selector: 'app-add-new-board',
  templateUrl: './add-new-board.component.html',
  styleUrls: ['./add-new-board.component.css']
})
export class AddNewBoardComponent implements OnInit {
  addBoard = true
  loadedBoards: Board[] = []


  constructor(private boardService: BoardService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.boardService.fetchBoards().subscribe(
      posts => {
        this.loadedBoards = posts
      }
    )
  }

  onEdit(){
    this.addBoard = false
  }

  onCancel(){
    this.addBoard = true
  }
  onNewBoard(postData: Board) {
    if (postData.name !== ''){
      this.boardService.onNewBoard(postData.name)
    }

  }



}

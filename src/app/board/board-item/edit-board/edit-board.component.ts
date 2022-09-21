import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/boards.service';

@Component({
  selector: 'app-edit-board',
  templateUrl: './edit-board.component.html',
  styleUrls: ['./edit-board.component.css']
})
export class EditBoardComponent implements OnInit {

  editBoard: boolean
  itemIndex: string

  constructor(private boardService: BoardService) {
    this.boardService.updateBoardname.subscribe(
      (editBoardVal: boolean) => this.editBoard = editBoardVal
    )
    this.boardService.passBoardIndex.subscribe(
      (id: string) => this.itemIndex = id
    )
   }

  ngOnInit(): void {
  }
  
  // onNewBoardName(inputEl1: HTMLInputElement){
  //   if (inputEl1.value !== ''){
  //     this.boardService.boardNewName(inputEl1.value, this.itemIndex)
  //   }
  // }

  onNewBoardName(inputEl1: HTMLInputElement){
    this.boardService.patchData(inputEl1.value, this.itemIndex)
    console.log(this.itemIndex)
    console.log(inputEl1.value)
  }

  onCancel(){
    this.boardService.updateBoardname.emit(false)
  }
}

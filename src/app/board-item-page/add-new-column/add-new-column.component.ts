import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/boards.service';
import { ColumnsService } from 'src/app/columns.services';
import { Column } from '../column.model';

@Component({
  selector: 'app-add-new-column',
  templateUrl: './add-new-column.component.html',
  styleUrls: ['./add-new-column.component.css']
})
export class AddNewColumnComponent implements OnInit {
  addBoard = true
  boardID: string[] = []
  loadedColumns: Column[] = []
  loadedBoards: Column[] = []


  constructor(private boardService: BoardService,
    private columnService: ColumnsService) { }

  ngOnInit(): void {
    this.boardID = this.boardService.getIds()
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
  onNewColumn(postData: Column) {
    if (postData.name !== ''){
      this.columnService.newColumn(postData.name, postData.boardID = this.boardID[0])
    }
  }
}

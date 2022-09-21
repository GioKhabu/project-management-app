import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/boards.service';
import { ColumnsService } from 'src/app/columns.services';

@Component({
  selector: 'app-edit-column',
  templateUrl: './edit-column.component.html',
  styleUrls: ['./edit-column.component.css']
})
export class EditColumnComponent implements OnInit {

  editColumn: boolean
  itemIndex: string

  constructor(private boardService: BoardService,
    private columnsService: ColumnsService) {
    this.columnsService.updateColumnName.subscribe(
      (editBoardVal: boolean) => this.editColumn = editBoardVal
    )
    this.columnsService.passColumnIndex.subscribe(
      (id: string) => this.itemIndex = id
    )
   }

  ngOnInit(): void {
  }
  
  onNewColumnName(inputEl1: HTMLInputElement){
    this.columnsService.patchData(inputEl1.value, this.itemIndex)
    console.log(this.itemIndex)
    console.log(inputEl1.value)
  }

  onCancel(){
    this.columnsService.updateColumnName.emit(false)
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColumnsService } from 'src/app/columns.services';

@Component({
  selector: 'app-column-delete-pop-up',
  templateUrl: './column-delete-pop-up.component.html',
  styleUrls: ['./column-delete-pop-up.component.css'],
})
export class ColumnDeletePopUpComponent implements OnInit {
  columnId: string
  name: string


  constructor(@Inject(MAT_DIALOG_DATA) public data,
    private columnsService: ColumnsService, 
) {
  this.columnId = data.id
  this.name = data.name
}

  ngOnInit(): void {}

  onDeleteColumn(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.columnsService.deleteColumn(this.columnId).subscribe(() => {});
  }
}

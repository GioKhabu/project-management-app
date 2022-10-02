import { Component, Input, OnInit } from '@angular/core';
import { ColumnsService } from 'src/app/columns.services';
import { Column } from '../../column.model';

@Component({
  selector: 'app-edit-column',
  templateUrl: './edit-column.component.html',
  styleUrls: ['./edit-column.component.css'],
})
export class EditColumnComponent implements OnInit {
  @Input() columnID: string;
  @Input() column: Column

  editColumn: boolean;

  constructor(private columnsService: ColumnsService) {
    this.columnsService.updateColumnName.subscribe(
      (editBoardVal: boolean) => (this.editColumn = editBoardVal)
    );
  }

  ngOnInit(): void {
  }

  onNewColumnName(inputEl1: HTMLInputElement) {
    this.columnsService.patchData(inputEl1.value, this.columnID);
  }

  onCancel() {
    this.column.editable = false
  }
}

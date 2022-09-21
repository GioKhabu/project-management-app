import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/board/board.model';

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.css']
})
export class BoardHeaderComponent implements OnInit {
  @Input() board: Board

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { BoardService } from './boards.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature: string[] = []


  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
    this.loadedFeature = this.boardService.pageload
  }

}

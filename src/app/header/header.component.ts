import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BoardService } from '../boards.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() featureSelected = new EventEmitter<string>()

  constructor(private accountService: BoardService) { }

  ngOnInit(): void {
    
  }

    onSelect(feature: string) {
      this.accountService.boardPageLoad(feature)
    }
}

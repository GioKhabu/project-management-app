import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { BoardService } from '../boards.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription
  // isAuthonticated = false
  @Output() featureSelected = new EventEmitter<string>();

  constructor(private accountService: BoardService, private authService: AuthService) {}

  ngOnInit(): void {
    // this.userSub = this.authService.user.subscribe(user => {
    // this.isAuthonticated = !!user
    // console.log(!user)
    // console.log(!!user)
    // });
  }

  onSelect(feature: string) {
    this.accountService.boardPageLoad(feature);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }

  onSaveData(){}
  onFetchData(){}
}

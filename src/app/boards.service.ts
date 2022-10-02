import { EventEmitter, Injectable } from '@angular/core';
import { Board } from './board/board.model';
import { HttpClient } from '@angular/common/http';
import { map, tap, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BoardService {
  pageload: string[] = ['main'];
  boardId: string[] = [];
  loadedBoards: Board[] = [];
  singleBoard: Board[] = [];
  boardsHttp: string =
    'https://project-managment-af720-default-rtdb.europe-west1.firebasedatabase.app/boards.json';
  deleteBoardsHTTP: string =
    'https://project-managment-af720-default-rtdb.europe-west1.firebasedatabase.app/boards';
  editBoard: boolean = true;
  returnId() {
    return this.boardId[0];
  }

  saveID() {
    localStorage.setItem('saveID', JSON.stringify(this.boardId));
  }

  getIds() {
    const ids = localStorage.getItem('saveID');
    if (ids) {
      this.boardId = JSON.parse(ids);
    }
    return this.boardId;
  }

  constructor(private http: HttpClient) {}

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  onNewBoard(name: string) {
    const postData: Board = { name: name };
    this.http
      .post<{ name: string }>(this.boardsHttp, postData)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      )
      .subscribe((responseData) => {
      });
  }

  patchData(name: string, key: string) {
    const postData: Board = { name: name };
    this.http
      .patch<{ name: string }>(`${this.deleteBoardsHTTP}/${key}.json`, postData)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      )
      .subscribe((responseData) => {
      });
  }

  fetchBoards() {
    return this.http.get<{ [key: string]: Board }>(this.boardsHttp).pipe(
      map((responseData) => {
        const postArray: Board[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        return postArray;
      })
    );
  }

  fetchSingleBoard(key: string) {
    return this.http.get(`${this.deleteBoardsHTTP}/${key}.json`);
  }

  deleteBoards(key: string) {
    return this.http.delete(`${this.deleteBoardsHTTP}/${key}.json`).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  boardPageLoad(feature: string) {
    this.pageload[0] = feature;
  }

  updateBoardname = new EventEmitter<boolean>();
  passBoardIndex = new EventEmitter<string>();
}

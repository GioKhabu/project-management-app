import { EventEmitter, Injectable } from '@angular/core';
import { Board } from './board/board.model';
import { HttpClient } from '@angular/common/http';
import { map, tap, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Column } from './board-item-page/column.model';

@Injectable({ providedIn: 'root' })
export class ColumnsService {
  pageload: string[] = ['main'];
  boardId: string[] = [];
  loadedBoards: Column[] = [];
  singleBoard: Column[] = [];
  columnHttp: string =
    'https://project-managment-af720-default-rtdb.europe-west1.firebasedatabase.app/columns.json';
  deletecolumnHTTP: string =
    'https://project-managment-af720-default-rtdb.europe-west1.firebasedatabase.app/columns';
  // editBoard: boolean = true
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

  newColumn(name: string, boardID: string) {
    const postData: Column = { name: name, boardID: boardID };
    this.http
      .post<{ name: string }>(this.columnHttp, postData)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      )
      .subscribe((responseData) => {
      });
  }

  fetchColumn() {
    return this.http.get<{ [key: string]: Column }>(this.columnHttp).pipe(
      map((responseData) => {
        const postArray: Column[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        return postArray;
      })
    );
  }

  deleteColumn(key: string) {
    return this.http.delete(`${this.deletecolumnHTTP}/${key}.json`).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  patchData(name: string, key: string) {
    const postData: Board = { name: name };
    this.http
      .patch<{ name: string }>(`${this.deletecolumnHTTP}/${key}.json`, postData)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      )
      .subscribe((responseData) => {
      });
  }

  updateColumnName = new EventEmitter<boolean>();
  passColumnIndex = new EventEmitter<string>();
}

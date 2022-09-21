import { EventEmitter, Injectable } from '@angular/core';
import { Board } from './board/board.model';
import { Column } from './board-item-page/column.model';
import { Task } from './board-item-page/task.model';

import { HttpClient } from '@angular/common/http';
import { map, tap, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TasksService {
  boardId: string[] = [];
  loadedBoards: Column[] = [];
  singleBoard: Column[] = [];
  taskHttp: string =
    'https://project-managment-af720-default-rtdb.europe-west1.firebasedatabase.app/tasks.json';
  deleteTaskHTTP: string =
    'https://project-managment-af720-default-rtdb.europe-west1.firebasedatabase.app/tasks';
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

  newTask(
    name: string,
    description: string,
    boardID: string,
    columnID: string
  ) {
    const postData: Task = {
      name: name,
      description: description,
      boardID: boardID,
      columnID: columnID,
    };
    this.http
      .post(this.taskHttp, postData)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchTask() {
    return this.http.get<{ [key: string]: Task }>(this.taskHttp).pipe(
      map((responseData) => {
        const postArray: Task[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postArray.push({ ...responseData[key], id: key });
          }
        }
        return postArray;
      })
    );
  }

  deleteTask(key: string) {
    return this.http.delete(`${this.deleteTaskHTTP}/${key}.json`).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  patchData(name: string, description:string, key: string) {
    const postData: Task = { name: name, description: description };
    this.http
      .patch<{ name: string; description: string }>(
        `${this.deleteTaskHTTP}/${key}.json`,
        postData
      )
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  updateTaskName = new EventEmitter<boolean>();
  updateTask = new EventEmitter<boolean>();
  passBoardIndex = new EventEmitter<string>();
  passColumnIndex = new EventEmitter<string>();
  passTaskIndex = new EventEmitter<string>();
}

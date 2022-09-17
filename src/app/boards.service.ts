import { EventEmitter, Injectable } from "@angular/core";
import { Board } from "./board/board.model";
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'


@Injectable({providedIn: 'root'})
export class BoardService {
    pageload: string [] = ['main']
  loadedBoards: Board[] = []

    // editBoard: boolean = true

    items: Board[] = [
        {name: 'project1'},
        {name: 'project2'},
        {name: 'project3'},
          ]

          constructor(private http: HttpClient) { }



          // onNewBoard(inputEl: string) {
          //    this.items.unshift({name: inputEl})
          // }

          onNewBoard(name: string) {
            const postData: Board = {name: name}
            this.http.post<{name:string}>('https://project-managment-af720-default-rtdb.europe-west1.firebasedatabase.app/boards.json', 
      postData).subscribe(responseData => {
        console.log(responseData)
       })
         }

         fetchBoards () {
          return this.http
          .get<{[key:string]: Board}>('https://project-managment-af720-default-rtdb.europe-west1.firebasedatabase.app/boards.json')
          .pipe(map(responseData => {
            const postArray: Board[] =[]
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                postArray.push({...responseData[key], id: key})
              }
            }
            return postArray;
          }))
         }

          deleteBoard(index: number) {
            this.items.splice(index, 1)
            console.log(index)
          }

          boardNewName(inputEl: string, index:number){
            this.items[index].name =  inputEl
          }

          boardPageLoad(feature: string){
            this.pageload[0] = feature
          }

          updateBoardname = new EventEmitter<boolean>()
          passBoardIndex = new EventEmitter<number>()
         
}

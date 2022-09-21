import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import {DragDropModule } from '@angular/cdk/drag-drop'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { BoardComponent } from './board/board.component';
import { BoardItemComponent } from './board/board-item/board-item.component';
import { BoardItemPageComponent } from './board-item-page/board-item-page.component';
import { TasksComponent } from './board-item-page/tasks/tasks.component';
import { EditTasksComponent } from './board-item-page/edit-tasks/edit-tasks.component';
import { AddNewBoardComponent } from './board/board-item/add-new-board/add-new-board.component';
import { EditBoardComponent } from './board/board-item/edit-board/edit-board.component';
import { BoardListItemComponent } from './board/board-item/board-list-item/board-list-item.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ColumnComponent } from './board-item-page/column/column.component';
import { BoardHeaderComponent } from './board-item-page/board-header/board-header.component';
import { AddNewColumnComponent } from './board-item-page/add-new-column/add-new-column.component';
import { EditColumnComponent } from './board-item-page/edit-column/edit-column.component';
import { AddNewTaskComponent } from './board-item-page/add-new-task/add-new-task.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent},
  { path: 'boards', component: BoardComponent},
  {path: 'boards/boardsItem', component: BoardItemPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    BoardComponent,
    BoardItemComponent,
    BoardItemPageComponent,
    TasksComponent,
    EditTasksComponent,
    AddNewBoardComponent,
    EditBoardComponent,
    BoardListItemComponent,
    ColumnComponent,
    BoardHeaderComponent,
    AddNewColumnComponent,
    EditColumnComponent,
    AddNewTaskComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

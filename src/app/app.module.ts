import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import {DragDropModule } from '@angular/cdk/drag-drop'
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { BoardComponent } from './board/board.component';
import { BoardItemComponent } from './board/board-item/board-item.component';
import { BoardItemPageComponent } from './board-item-page/board-item-page.component';
import { TasksComponent } from './board-item-page/tasks/tasks.component';
import { EditTasksComponent } from './board-item-page/tasks/edit-tasks/edit-tasks.component';
import { AddNewBoardComponent } from './board/board-item/add-new-board/add-new-board.component';
import { EditBoardComponent } from './board/board-item/edit-board/edit-board.component';
import { BoardListItemComponent } from './board/board-item/board-list-item/board-list-item.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColumnComponent } from './board-item-page/column/column.component';
import { BoardHeaderComponent } from './board-item-page/board-header/board-header.component';
import { AddNewColumnComponent } from './board-item-page/add-new-column/add-new-column.component';
import { EditColumnComponent } from './board-item-page/column/edit-column/edit-column.component';
import { AddNewTaskComponent } from './board-item-page/add-new-task/add-new-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ColumnDeletePopUpComponent } from './board-item-page/column/column-delete-pop-up/column-delete-pop-up.component';
import { TaskDeletePopUpComponent } from './board-item-page/tasks/task-delete-pop-up/task-delete-pop-up.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ScrollingModule} from '@angular/cdk/scrolling'
import { DropdownDirective } from './shared/dropdown.directive';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner-component';

const appRoutes: Routes = [
  { path: '', component: MainComponent},
  { path: 'boards', component: BoardComponent},
  {path: 'boards/boardsItem', component: BoardItemPageComponent},
  {path: 'auth', component: AuthComponent}
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
    ColumnDeletePopUpComponent,
    TaskDeletePopUpComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  entryComponents: [ColumnDeletePopUpComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ScrollingModule,
  ],
  exports: [MatInputModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

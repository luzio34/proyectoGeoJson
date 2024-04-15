import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CommentDialogModule } from './comment-dialog/comment-dialog.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule, 
    FormsModule,
    BrowserModule,
    CommonModule,
    MatDialogModule,
    CommentDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
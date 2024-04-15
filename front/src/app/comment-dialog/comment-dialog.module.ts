import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { CommentDialogComponent } from './comment-dialog.component';

@NgModule({
  declarations: [
    CommentDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    MatDialogModule,
    HttpClientModule
  ],
  exports: [CommentDialogComponent]
})
export class CommentDialogModule { }
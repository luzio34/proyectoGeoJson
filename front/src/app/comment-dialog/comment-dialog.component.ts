import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent {
  comment: string = '';

  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService
  ) { }

  onCloseClick(): void {
    this.dialogRef.close();
  }
  
  onSubmit(): void {
    console.log('Comentario:', this.comment);
    if (this.comment.trim() !== '') {
      console.log('Formulario válido');
      console.log('Comentario:', this.comment);
      
      // Envía el comentario al servidor usando el servicio de API
      this.apiService.addComment(this.data.featureId, this.comment).subscribe(response => {
        console.log('Comentario enviado con éxito:', response);
        // Luego puedes cerrar el diálogo si es necesario
        this.dialogRef.close();
      }, error => {
        console.error('Error al enviar el comentario:', error);
      });
      
    } else {
      console.log('Formulario inválido');
    }
  }

}
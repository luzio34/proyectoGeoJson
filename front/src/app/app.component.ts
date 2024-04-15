import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Agregamos la importación del HttpClient
import { ApiService } from './api.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';


// Definición de la interfaz para representar la estructura de datos de las características
interface Feature {
  id: number;
  type: string;
  attributes: {
    external_id: string;
    magnitude: string;
    place: string;
    time: string;
    tsunami: boolean;
    mag_type: string;
    title: string;
    coordinates: {
      longitude: string;
      latitude: string;
    };
  };
  links: {
    external_url: string;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent implements OnInit {
  features: Feature[] = [];
  filteredFeatures: Feature[] = [];
  pagination: any;
  magTypes: string[] = ['md', 'ml', 'ms', 'mw', 'me', 'mi', 'mb', 'mlg'];
  selectedMagTypes: string[] = [];
  

  constructor(private http: HttpClient, private apiService: ApiService, private dialog: MatDialog) {} // Inyectamos el HttpClient

  ngOnInit() {
    this.apiService.getFeatures().subscribe((data: any) => {
      if (data && data.data) { // Verifica si data y data.data existen
        this.features = data.data; // Asigna los datos al arreglo de características
        this.pagination = data.pagination;
        this.filteredFeatures = [...this.features]; // Copia independiente de las características filtradas
      } else {
        console.error('Data no tiene la estructura esperada:', data);
      }
    });
  }


    toggleFilter(magType: string) {
      if (this.selectedMagTypes.includes(magType)) {
        // Si el filtro ya está seleccionado, quitarlo
        this.selectedMagTypes = this.selectedMagTypes.filter(type => type !== magType);
      } else {
        // Si el filtro no está seleccionado, agregarlo
        this.selectedMagTypes.push(magType);
      }
      this.applyFilters();
    }
  
    applyFilters() {
      if (this.selectedMagTypes.length === 0) {
        // Si no hay filtros seleccionados, mostrar todas las características
        this.filteredFeatures = this.features;
      } else {
        // Aplicar filtros seleccionados
        this.filteredFeatures = this.features.filter(feature =>
          this.selectedMagTypes.includes(feature.attributes.mag_type)
        );
      }
    }
  
    isSelectedMagType(magType: string): boolean {
      return this.selectedMagTypes.includes(magType);
    }

    
    openCommentDialog(featureId: number) {
      // Abre el cuadro de diálogo
      const dialogRef = this.dialog.open(CommentDialogComponent, {
        width: '400px', // Ancho del cuadro de diálogo
        data: { featureId } // Pasa el ID del feature al cuadro de diálogo
      });
  
      // Maneja el resultado del cuadro de diálogo si es necesario
      dialogRef.afterClosed().subscribe(result => {
        console.log('El cuadro de diálogo fue cerrado');
        // Aquí puedes realizar acciones adicionales después de que el cuadro de diálogo se haya cerrado
      });
    }


}

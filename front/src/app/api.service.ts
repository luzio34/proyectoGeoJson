import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})



export class ApiService {
  constructor(private http: HttpClient) { }

  // Métodos para hacer solicitudes HTTP
  

  getFeatures(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/features');
  }

  addComment(featureId: number, body: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/api/features/${featureId}/comments`, { body });
  }

  
}



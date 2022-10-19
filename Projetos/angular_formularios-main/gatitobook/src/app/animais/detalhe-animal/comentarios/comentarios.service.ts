import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { Comentario, Comentarios } from './comentarios';

const API = environment.API;

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(private http: HttpClient) { }

  buscaComentario(animalId: number): Observable<Comentarios> {
    return this.http.get<Comentarios>(`${API}/photos/${animalId}/comments`);
  }

  incluiComentario(animalId: number, comment: string): Observable<Comentario> {
    return this.http.post<Comentario>(`${API}/photos/${animalId}/comments`, { commentText: comment });
  }
}

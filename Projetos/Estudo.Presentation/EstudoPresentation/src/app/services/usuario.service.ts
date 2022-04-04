import { UsuarioViewModel } from './../ViewModel/UsuarioViewModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  getUsuarios(): Observable<Array<UsuarioViewModel>> {
    return this.httpClient.get<Array<UsuarioViewModel>>('https://localhost:44331/api/Usuario/GetAll');
  }

  addUsuario(usuario: UsuarioViewModel):Observable<any> {

    // const headers = new HttpHeaders();
    // headers.set('Content-Type: application/json; charset=utf-8',['Access-Control-Allow-Origin: *', 'Access-Control-Allow-Methods: *']);
    // return this.httpClient.post<any>('https://localhost:44331/api/Usuario/Create', usuario, {headers: headers});

    return this.httpClient.post<any>('https://localhost:44331/api/Usuario/Create', usuario);

  }

  updateUsuario(usuario: UsuarioViewModel):Observable<any> {

    return this.httpClient.put<any>('https://localhost:44331/api/Usuario/Update', usuario);

  }

  getUsuario(id?: number):Observable<UsuarioViewModel> {
    return this.httpClient.get<UsuarioViewModel>(`https://localhost:44331/api/Usuario/Get?id=${id}`);
  }

  deleteUsurio(id?: number):Observable<any> {
    //const headers = new HttpHeaders();
    //headers.set('Content-Type: application/json; charset=utf-8',['Access-Control-Allow-Origin: *', 'Access-Control-Allow-Methods: *']);
    return this.httpClient.delete<any>(`https://localhost:44331/api/Usuario/Delete?id=${id}`);
  }
}

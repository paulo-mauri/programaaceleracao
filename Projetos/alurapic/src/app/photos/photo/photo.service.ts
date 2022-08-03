import { PhotoComment } from './photo-comment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';

import { Photo } from './photo';

import { environment } from 'src/environments/environment';

const API = environment.API_URL;

@Injectable({ providedIn: 'root' })
export class PhotoService {

    constructor(private http: HttpClient) { }

    listFromUser(username: string): Observable<Photo[]> {
        return this.http
            .get<Photo[]>(API + `/${username}/photos`);
    }

    listFromUserPaginated(username: string, page: number): Observable<Photo[]> {
        const parametros = new HttpParams()
            .append('page', page.toString())

        return this.http
            .get<Photo[]>(API + `/${username}/photos`, { params: parametros });
    }

    upload(description: string, allowComments: boolean, file: File) {

        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments ? 'true': 'false');
        formData.append('imageFile', file);

        return this.http.post(
            API + '/photos/upload',
            formData,
            {
                observe: 'events',
                reportProgress: true
            });
    }

    findById(photoId: number) {
        return this.http.get<Photo>(API + '/photos/' + photoId);
    }

    getComments(photoId: number) {
        return this.http.get<PhotoComment[]>(API + '/photos/' +  photoId + '/comments');
    }

    addComment(photoId: number, commentText: string) {
        return this.http.post(API + '/photos/' +  photoId + '/comments', { commentText } );
    }

    removePhoto(photoId: number) {
        return this.http.delete(API + '/photos/' +  photoId );
    }

    like(photoId: number) {
        return this.http.post(API + '/photos/' + photoId + '/like', {}, { observe: 'response'}) // parametro observe: 'response' para escutar o codigo de status
                        // pega o subscribe e retorna observable<boolean>
                        .pipe(map(resposta => true))   // map da resposta e retorna como verdadeiro
                        // mas se der um erro
                        .pipe(catchError(err => {        // fazer outro pipe.. se der um error eu tenho que capturar esse erro
                                                         // e pegar o erro atraves do catchError
                            return err.status == '304' ? of(false) : throwError(err);
                                        // operador of() retorna um novo observable
                                        // throwError() dispara o erro
                        }));
    }
}

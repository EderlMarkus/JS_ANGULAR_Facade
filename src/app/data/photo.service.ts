import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Observer} from "rxjs";
import {Photo} from "../entities/photo";


@Injectable({
  providedIn: "root"
})
export class PhotoService{
    readonly #http = inject(HttpClient);
    readonly #apiBaseUrl = "https://jsonplaceholder.typicode.com/photos";
    readonly #headers = {Accept: 'application/json'};

    find(params: HttpParams): Observable<Photo[]>{
      const headers = this.#headers;
      return this.#http.get<Photo[]>(this.#apiBaseUrl, {headers,params});
    }

    findById(id: string): Observable<Photo[]> {
      const params = new HttpParams().set("id",id);
      return this.find(params);
    }

  findByAlbumId(albumId: string): Observable<Photo[]> {
    const params = new HttpParams().set("albumId",albumId);
    return this.find(params);
  }
}

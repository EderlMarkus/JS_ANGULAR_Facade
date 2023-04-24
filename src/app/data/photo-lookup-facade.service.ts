import {PhotoSearchParams} from "../entities/photoSearchParams";
import {Photo} from "../entities/photo";
import {Facade} from "../shared/entities/facade";
import {PhotoService} from "./photo.service";
import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, Observable, of, shareReplay, switchMap, tap} from "rxjs";
import {HttpErrorResponse, HttpParams} from "@angular/common/http";
@Injectable({ providedIn: 'root' })
export class PhotoLookupFacade implements Facade<PhotoSearchParams, Photo[]>{

  readonly #photoService = inject(PhotoService);
  readonly #loadingSubject$ = new BehaviorSubject<boolean>(false);
  readonly #errorSubject$ = new BehaviorSubject<{isError: boolean; error?: HttpErrorResponse}>({isError: false});
  readonly #searchParamsSubject$ = new BehaviorSubject<PhotoSearchParams>({id: "", albumId: ""});

  readonly #photos$ = this.#searchParamsSubject$.pipe(
    tap(() => this.#loadingSubject$.next(true)),
    switchMap((parameter) => this.#load(parameter.id, parameter.albumId)),
    tap(() => this.#loadingSubject$.next(false)),
    shareReplay({bufferSize: 1, refCount: true})
  )

  readonly query = {
    runQuery: (params: any) => {
      const previousParams = this.#searchParamsSubject$.getValue();
      this.#searchParamsSubject$.next({...previousParams, ...params});
    },
    reset: () => this.#searchParamsSubject$.next({id: "",albumId: ""}),
    data$: this.#photos$,
    params$: this.#searchParamsSubject$.asObservable(),
    isLoading$: this.#loadingSubject$.asObservable(),
    isError$: this.#errorSubject$.asObservable().pipe(map((e) => e.isError)),
    error$: this.#errorSubject$.asObservable().pipe(map(e => e.error))
  };

  #load(id: string, albumId: string): Observable<Photo[]> {
    let photos$: Observable<Photo[]>;
    switch (true) {
      case !!id && !albumId:
        photos$ = this.#photoService.findById(id);
        break;
      case !id && !!albumId:
        photos$ = this.#photoService.findByAlbumId(albumId);
        break;
      case !!id && !!albumId:
        photos$ = this.#photoService.find(new HttpParams().set("id", id).set("albumId", albumId));
        break;
      default:
        photos$ = of([])
    }

    return photos$.pipe(
      tap(() => this.#resetErrorSubject()),
      catchError((err: HttpErrorResponse) => {
        this.#errorSubject$.next({isError: true, error: err})
        return of([])
      })
    )
  }
    #resetErrorSubject() {
      if (this.#errorSubject$.value.error){
        this.#errorSubject$.next({isError: false})
      }
    }

}

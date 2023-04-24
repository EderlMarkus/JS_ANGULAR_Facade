import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

export interface Facade<TParams, TResponse>{
  readonly query: FacadeQuery<TParams, TResponse>;
}

export interface FacadeQuery<TParams, TResponse>{
  params$?: Observable<TParams>;
  runQuery: (p: TParams) => void;
  data$: Observable<TResponse>;
  isLoading$: Observable<boolean>;
  isError$: Observable<boolean>;
  error$?: Observable<HttpErrorResponse | undefined>;
}

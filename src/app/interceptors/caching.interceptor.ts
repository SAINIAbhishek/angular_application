import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpCacheService} from '../services/http-cache/http-cache.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private httpCacheService: HttpCacheService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.method !== 'GET') {
      return next.handle(request);
    }

    if (request.headers.get('cache') === 'clear') {
      this.httpCacheService.clearCache();
    }

    if (request.headers.get('cache') === 'reset') {
      this.httpCacheService.delete(request.urlWithParams);
    }

    const cachedResponse = this.httpCacheService.get(request.urlWithParams);

    if (cachedResponse) {
      return of(cachedResponse.clone());
    }

    /**
     * request is going for the first time then let the request process
     * and cache the response
     */
    return next.handle(request).pipe(
      tap( (event) => {
        if (event instanceof HttpResponse) {
          this.httpCacheService.set(request.urlWithParams, event.clone());
        }
      })
    );

  }
}

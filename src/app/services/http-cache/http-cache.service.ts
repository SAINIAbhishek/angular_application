import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {

  private cache: Map<string, HttpResponse<any>> = new Map<string, HttpResponse<any>>();

  constructor() { }

  public get(url: string): HttpResponse<any> | undefined {
    return this.cache[url];
  }

  public set(url: string, response: HttpResponse<any>): void {
    this.cache[url] = response;
  }

  public clearCache(): void {
    this.cache = new Map<string, HttpResponse<any>>();
  }

  public delete(url: string): void {
    delete this.cache[url];
  }

}

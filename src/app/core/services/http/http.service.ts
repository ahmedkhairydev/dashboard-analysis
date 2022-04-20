import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

interface URL_Config {
  APIName: string;
  params?: { [header: string]: string | string[]; };
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  get<T>(URL_Config: URL_Config) {
    return this.http.get<T>(`${URL_Config.APIName}`, { params: URL_Config.params }).pipe(map(event => {
      return event;
    }));
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    public httpClient: HttpClient) {
  }

  public get(url: string, headers?): Observable<any> {
    return this.httpClient.get<any>(url, headers);
  }

  public post(url: string, body: any, headers?): Observable<any> {
    return this.httpClient.post<any>(url, body, headers);
  }

  public put(url: string, body: any, headers?): Observable<any> {
    return this.httpClient.put<any>(url, body, headers);
  }

  public delete(url: string, headers?): Observable<any> {
    return this.httpClient.delete<any>(url, headers);
  }

}

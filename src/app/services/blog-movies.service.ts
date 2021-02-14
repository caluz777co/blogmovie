
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class BlogMoviesService extends GeneralService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  public consultarCategorias(): Observable<any> {
    let url = `${environment.baseUrl}${environment.categorias}`;
    return super.get(url);
  }

  public consultarPeliculas(): Observable<any> {
    let url = `${environment.baseUrl}${environment.peliculas}`;
    return super.get(url);
  }

}

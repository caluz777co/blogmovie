
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralService } from './general.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { Usuario } from '../models/usuario.model';
import { Sesion } from '../models/sesion.model';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class BlogMoviesService extends GeneralService {

  constructor(
    public httpClient: HttpClient,
    private cookies: CookieService
    ) {
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

  public registrarUsuario(body: Usuario): Observable<any> {
    let url = `${environment.baseUrl}${environment.registro}`;
    return super.post(url, body);
  }

  public iniciarSesion(body: Sesion) : Observable<any> {
    let url = `${environment.baseUrl}${environment.login}`;
    return super.post(url, body);
  }

  public obtenerComentarios(body: any) : Observable<any> {
    let url = `${environment.baseUrl}${environment.comentario}`;
    return super.post(url, body);
  }

  public agregarComentario(body: any) : Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    let url = `${environment.baseUrl}${environment.agregarComentario}`;
    return super.post(url, body,headers);
  }

  public agregarLike( id: Number) : Observable<any> {
    let url = `${environment.baseUrl}${environment.masLike}/${id}`;
    return super.put(url);
  }

  public agregarToken(token: any) {
    this.cookies.set("token", token);
  }

  public obtenerToken() {
    return this.cookies.get("token");
  }

  public obtenerUsuarioLogeado(): any {
    const token = this.obtenerToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    let url = `${environment.baseUrl}${environment.perfil}`;
    return super.get(url, { headers: headers });
  }

  public obtenerTop(): any {
    let url = `${environment.baseUrl}${environment.top}`;
    return super.get(url);
  }

  public liberarToken(): void {
    this.cookies.delete("token");
  }

}

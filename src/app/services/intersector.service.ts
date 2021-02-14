import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpinnerServiceService } from './spinner-service.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntersectorService implements HttpInterceptor {

  constructor(
    private spinnerService: SpinnerServiceService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerService.llamarSpinner();
    return next.handle(req).pipe(
      finalize(()=> this.spinnerService.detenerSpinner())
    );
  }
}

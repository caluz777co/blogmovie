import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class SpinnerServiceService {

  constructor(
    private spinnerService: NgxSpinnerService
  ) { }

  public llamarSpinner() {
    this.spinnerService.show();
  }

  public detenerSpinner() {
    this.spinnerService.hide();
  }

}

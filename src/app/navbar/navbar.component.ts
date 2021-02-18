import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BlogMoviesService } from '../services/blog-movies.service';
import { Usuario } from '../models/usuario.model';
import { Sesion } from '../models/sesion.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  closeResult = '';
  usuario = new Usuario();
  sesion = new Sesion();
  infoSesion = [];

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    email: new FormControl('',[Validators.email, Validators.required, Validators.maxLength(100)]),
    password: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    confirm_password: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
  });

  sesionForm = new FormGroup({
    email: new FormControl('',[Validators.email, Validators.required, Validators.maxLength(100)]),
    password: new FormControl('',[Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  });

  constructor(
    private modalService: NgbModal,
    private service: BlogMoviesService
  ) { }

  ngOnInit(): void {
  }

  openLogIn(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openSignIn(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public iniciarSesion(): Promise<any> {
    this.sesion =  this.sesionForm.value;
    return new Promise((resolve) =>{
      this.service.iniciarSesion(this.sesion)
      .subscribe(
        (res)=>{
          console.log(res)
          resolve(res);
        },
        (err) => {
          console.log(err);
        }
      );
    })
  }

  public registrarUsuario(): Promise<any> {
    this.usuario =  this.profileForm.value;
    return new Promise((resolve) =>{
      this.service.registrarUsuario(this.usuario)
      .subscribe(
        (res)=>{
          console.log(res)
          resolve(res);
        },
        (err) => {
          console.log(err);
        }
      );
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}

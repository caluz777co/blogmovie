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
  public usuario = new Usuario();
  public sesion = new Sesion();
  public infoSesion: any;

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
    this.verificarSesion()
      .then((res)=>{
        this.infoSesion = res;
      })
      .catch((err)=>{
        this.infoSesion = null;
      });
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
    return new Promise((resolve, reject) =>{
      this.service.iniciarSesion(this.sesion)
      .subscribe(
        (res)=>{
          this.service.agregarToken(res.token);
          this.ngOnInit();
          resolve(res);
        },
        (err) => {
          reject(err);
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
          this.service.agregarToken(res.token);
          this.ngOnInit();
          resolve(res);
        },
        (err) => {
          console.log(err);
        }
      );
    })
  }

  public verificarSesion(): Promise<any> {
    return new Promise((resolve) =>{
      this.service.obtenerUsuarioLogeado()
      .subscribe(
        (res)=>{
          resolve(res);
        },
        (err) => {
          console.log(err);
        }
      );
    })
  }

  public cerrarSesion(): void {
    this.service.liberarToken();
    this.ngOnInit();
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

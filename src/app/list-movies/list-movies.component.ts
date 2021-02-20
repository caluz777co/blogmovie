import { Component, OnInit, ViewChild } from '@angular/core';
import { Pelicula } from '../models/pelicula.model';
import { BlogMoviesService } from '../services/blog-movies.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexTheme,
  ApexGrid,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  theme: ApexTheme;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
};

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public peliculas: any;
  public pageActual: number = 1;
  public onHome: boolean = true;
  public onPelicula: boolean = false;
  public peliculaSelecionada: Pelicula;
  public comentarios: any;
  public infoSesion: any;

  constructor(
    private service: BlogMoviesService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init(): Promise<void> {
    this.peliculas = await this.obtenerTodoPeliculas();
    this.chartOptions = await this.cargarTop();
  }

  public async verPelicula(pelicula: Pelicula){
    this.onHome = false;
    this.onPelicula = true;
    this.peliculaSelecionada = pelicula;
    this.obtenerComentariosPelicula({ "pelicula_id": this.peliculaSelecionada.id })
      .then((res)=>{
        console.log(res.comentarios)
        this.comentarios=res.comentarios;
        })
        .catch((err)=>{
          this.comentarios=[];
        });
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

  public obtenerComentariosPelicula(data): Promise<any> {
    return new Promise((resolve) =>{
      this.service.obtenerComentarios(data)
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

  public anadirComentario(){
    console.log(this.formComentario.value.comentario);
    this.verificarSesion()
      .then((res)=>{
        this.infoSesion=res;
      })
      .then(()=>{
        this.agregarComentarioPelicula({
          contenido: this.formComentario.value.comentario,
          users_id: this.infoSesion.user.id,
          peliculas_id: this.peliculaSelecionada.id
        })
        .then((res)=>{
          this.verPelicula(this.peliculaSelecionada);
        })
        .catch((err)=>{
          console.log('no agreada');
        });
      })
      .catch((err)=>{
        console.log(err);
      });
  }

  public anadirMeGusta(pelicula: Pelicula): void {
    this.meGusta(pelicula.id)
      .then((res)=>{
        if(res.success){
          this.peliculas.forEach(obj => {
            if(obj.id===pelicula.id){
              obj.likes+=1;
            }
          });
        }
      }).catch((err)=>{
        console.log(err)
      });
  }

  public regresar(): void {
    this.onPelicula=false;
    this.onHome=true;
  }

  formComentario = new FormGroup({
    comentario: new FormControl('',[ Validators.required, Validators.maxLength(300)])
  });

  abrirInputComentario(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
      //
    });
  }

  private agregarComentarioPelicula(data): Promise<any> {
    return new Promise((resolve) =>{
      this.service.agregarComentario(data)
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

  private meGusta(id): Promise<any> {
    return new Promise((resolve) =>{
      this.service.agregarLike(id)
      .subscribe(
        (res)=>{
          resolve(res);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  private obtenerTodoPeliculas(): Promise<any> {
    return new Promise((resolve) =>{
      this.service.consultarPeliculas()
      .subscribe(
        (res)=>{
          resolve(res);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  private cargarTop(): Promise<any> {
    return new Promise((resolve)=>{
      this.service.obtenerTop()
        .subscribe(
          (res)=>{
            let series=[];
            let categories=[];
            res.top.sort((a,b)=>{
              return b.series - a.series;
            });
            res.top.forEach(obj => {
              series.push(obj.series);
              categories.push(obj.categories);
            });
            let data = {
              series: [
                {
                  name: "Me gusta",
                  data: series
                }
              ],
              noData: {
                text: 'Loading...'
              },
              chart: {
                type: "bar",
                height: 450,
                width: "100%",
                toolbar: {
                  show: false
                }
              },
              plotOptions: {
                bar: {
                  horizontal: true
                }
              },
              dataLabels: {
                enabled: false
              },
              theme: {
                mode: "dark"
              },
              grid: {
                show: true
              },
              xaxis: {
                type: "category",
                categories: categories,
                labels: {
                  show: false
                },
                axisBorder: {
                  show: false
                },
                axisTicks: {
                  show: false
                }
              },

            };
            resolve(data);
          },
          (err)=>{
            console.log(err)
          }
        );
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Pelicula } from '../models/pelicula.model';
import { BlogMoviesService } from '../services/blog-movies.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.css']
})
export class ListMoviesComponent implements OnInit {
  public peliculas: Partial<Pelicula>;
  pageActual: number = 1;

  constructor(
    private service: BlogMoviesService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init(): Promise<void> {
    this.peliculas = await this.obtenerTodoPeliculas();
  }

  private obtenerTodoPeliculas(): Promise<any> {
    return new Promise((resolve) =>{
      this.service.consultarPeliculas()
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

}

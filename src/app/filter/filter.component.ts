import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { BlogMoviesService } from '../services/blog-movies.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  public categorias: Partial<Categoria>;

  constructor(
    private service: BlogMoviesService
  ) { }

  async init(): Promise<void> {
    this.categorias = await this.obtenerCategoriasPeliculas();
  }

  ngOnInit(): void {
    this.init();
  }

  private obtenerCategoriasPeliculas(): Promise<any> {
    return new Promise((resolve) =>{
      this.service.consultarCategorias()
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

}

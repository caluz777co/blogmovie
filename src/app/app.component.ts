import { Component, OnInit } from '@angular/core';
import { BlogMoviesService } from './services/blog-movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private service: BlogMoviesService
  ) {}

  ngOnInit(): void {
    //
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { RankingComponent } from './list-movies/ranking/ranking.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { IntersectorService } from './services/intersector.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SearchComponent,
    FilterComponent,
    ListMoviesComponent,
    RankingComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: IntersectorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

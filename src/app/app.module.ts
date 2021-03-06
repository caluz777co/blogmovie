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
import { CookieService } from 'ngx-cookie-service';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'ngx-avatar';

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
    ReactiveFormsModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    AvatarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: IntersectorService, multi: true },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './homepage/homepage.component';
import { CompanyService } from './company.service';
import { SearchComponent } from './search/search.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HomePageComponent,
    SearchComponent,
    CompaniesListComponent,
  ],
  providers: [CompanyService],
  bootstrap: [AppComponent],
})
export class AppModule {}

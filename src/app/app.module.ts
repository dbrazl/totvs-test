import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './homepage/homepage.component';
import { CompanyService } from './company.service';
import { SearchComponent } from './search/search.component';
import { CompaniesListComponent } from './companies-list/companies-list.component';
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  declarations: [
    AppComponent,
    HomePageComponent,
    SearchComponent,
    CompaniesListComponent,
    DialogModalComponent,
  ],
  providers: [CompanyService],
  bootstrap: [AppComponent],
})
export class AppModule {}

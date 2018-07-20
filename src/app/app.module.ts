import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA  } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MDBBootstrapModulePro } from './typescripts/pro';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2PaginationModule } from 'ng2-pagination';

import { AppComponent } from './app.component';

import { ApiService } from './api.service';
import { EventService } from './event.service';
import { routerModule} from './app.routing';

import { DashboardComponent} from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { ListOfersComponent } from './list-ofers/list-ofers.component';
import { FooterComponent } from './footer/footer.component';
import { OfersComponent } from './ofers/ofers.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SearchComponent,
    ListOfersComponent,
    FooterComponent,
    OfersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routerModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2PaginationModule,
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModulePro.forRoot()
  ],
  providers: [ApiService, EventService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }

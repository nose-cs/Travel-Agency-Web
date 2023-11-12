import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HotelOffersComponent } from './hotel-offers/hotel-offers.component';
import { ShowHotelOffersComponent } from './hotel-offers/show-hotel-offers/show-hotel-offers.component';
import { SharedService } from './shared.service';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationInterceptor } from './interceptor';
import { FlightOffersComponent } from './flight-offers/flight-offers.component';
import { ShowFlightOffersComponent } from './flight-offers/show-flight-offers/show-flight-offers.component';
import { ShowTourOffersComponent } from './tour-offers/show-tour-offers/show-tour-offers.component';
import { TourOffersComponent } from './tour-offers/tour-offers.component';
import { HoterFilterComponent } from './hotel-offers/hoter-filter/hoter-filter.component';
import { HotelOfferDetailsComponent } from './hotel-offers/hotel-offer-details/hotel-offer-details.component';
import { LoginComponent } from './login/login.component';
import { AddHotelOffersComponent } from './add-hotel-offers/add-hotel-offers.component';
import { FlightFilterComponent } from './flight-offers/flight-filter/flight-filter.component';
import { JQueryStyleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { PackageOffersComponent } from './package-offers/package-offers.component';
@NgModule({
  declarations: [
    AppComponent,
    HotelOffersComponent,
    ShowHotelOffersComponent,
    FlightOffersComponent,
    ShowFlightOffersComponent,
    ShowTourOffersComponent,
    TourOffersComponent,
    HoterFilterComponent,
    HotelOfferDetailsComponent,
    LoginComponent,
    AddHotelOffersComponent,
    FlightFilterComponent,
    PackageOffersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

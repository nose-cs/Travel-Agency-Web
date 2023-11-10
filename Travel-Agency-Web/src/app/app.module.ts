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

@NgModule({
  declarations: [
    AppComponent,
    HotelOffersComponent,
    ShowHotelOffersComponent,
    FlightOffersComponent,
    ShowFlightOffersComponent
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

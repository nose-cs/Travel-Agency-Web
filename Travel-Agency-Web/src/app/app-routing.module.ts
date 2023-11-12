import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HotelOffersComponent } from './hotel-offers/hotel-offers.component';
import { FlightOffersComponent } from './flight-offers/flight-offers.component';
import { TourOffersComponent } from './tour-offers/tour-offers.component';
import { LoginComponent } from './login/login.component';
import { AddHotelOffersComponent } from './add-hotel-offers/add-hotel-offers.component';

const routes: Routes = [
  { path: 'hotelOffers', component: HotelOffersComponent },
  {path: 'flightOffers', component: FlightOffersComponent},
  {path: 'tourOffers', component: TourOffersComponent },
  {path: 'login', component: LoginComponent},
  {path: 'addHotelOffer', component: AddHotelOffersComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

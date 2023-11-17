import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HotelOffersComponent } from './hotel-offers/hotel-offers.component';
import { FlightOffersComponent } from './flight-offers/flight-offers.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'Home', component: HomeComponent },
  {path: 'HotelOffers', component: HotelOffersComponent },
  {path: 'FlightOffers', component: FlightOffersComponent}
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

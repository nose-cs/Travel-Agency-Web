import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HotelOffersComponent } from './hotel-offers/hotel-offers.component';
import { FlightOffersComponent } from './flight-offers/flight-offers.component';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelfilteringComponent } from './hotels/hotelfiltering/hotelfiltering.component';
import { StaffSiteComponent } from './staff-site/staff-site.component';
import { ShowHotelOffersComponent } from './hotel-offers/show-hotel-offers/show-hotel-offers.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'StaffSite', component: StaffSiteComponent },
  { path: 'HotelOffers', component: HotelOffersComponent },
  { path: 'FlightOffers', component: FlightOffersComponent},
  { path: 'Hotels', component: HotelsComponent},
  { path: 'HotelFiltering', component: HotelfilteringComponent},
  {path: 'ShowHotelOffers', component: ShowHotelOffersComponent},
  {path: 'OfferFilter', component: HotelfilteringComponent}
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

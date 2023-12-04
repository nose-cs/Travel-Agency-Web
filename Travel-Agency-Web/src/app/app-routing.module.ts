import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { HotelsComponent } from './hotels/hotels.component';
import { HotelfilteringComponent } from './hotels/hotelfiltering/hotelfiltering.component';
import { StaffSiteComponent } from './staff-site/staff-site.component';
import { ShowOffersComponent } from './show-offers/show-offers.component';
import { HomeComponent } from './home/home.component';
import { FlightsComponent } from './flights/flights.component';
import { ToursComponent } from './tours/tours.component';
import { UserSiteComponent } from './user-site/user-site.component';
import {PacksComponent} from "./packs/packs.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'StaffSite', component: StaffSiteComponent },
  { path: 'Hotels', component: HotelsComponent},
  { path: 'HotelFiltering', component: HotelfilteringComponent},
  { path: 'ShowOffers', component: ShowOffersComponent},
  { path: 'OfferFilter', component: HotelfilteringComponent},
  { path: 'Flights', component: FlightsComponent},
  { path: 'Tours', component: ToursComponent },
  { path: 'UserSite', component: UserSiteComponent },
  {path: 'Packages', component: PacksComponent},
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

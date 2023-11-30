import { Component } from '@angular/core';
import { Place, Hotel } from '../models/hotel';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Flight } from '../models/flight';
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {
  layout: 'list' | 'grid' = 'list';

  constructor(private service: SharedService, private router: Router) { }

  name!: string;
  address!: string;
  category!: number;

  FlightList: Flight[] = [];

  ngOnInit(): void {
      this.refreshHotelList();
  }

  refreshHotelList() {
      this.service.getFlights().subscribe(data => {
        this.FlightList = data;
      });
  }

  onFilter(data: Flight[]) {
    // Asigna los resultados del filtro a la variable
    console.log(data)
    this.FlightList = data;
  }

  openOfferList(hotelId: number) {
    console.log(hotelId);
    this.router.navigate(['ShowHotelOffers'], { queryParams: { hotelId: hotelId } });
  }

  openHotel(id: number) {
    console.log(id);
  }

  openAgency(id: number) {
    console.log(id);
  }

  getStars(category: number): string {
  
    return '⭐'.repeat(category);
  }
  getAddres(place: Place) {
    return place.address + ', ' + place.city + ', ' + place.country;
  }

}

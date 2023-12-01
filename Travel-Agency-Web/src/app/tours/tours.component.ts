import { Component } from '@angular/core';
import { Tour } from '../models/tour';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Place } from '../models/hotel';
@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent {
  layout: 'list' | 'grid' = 'list';

  constructor(private service: SharedService, private router: Router) { }

  TourList: Tour[] = [];

  ngOnInit(): void {
      this.refreshTourList();
  }

  refreshTourList() {
      this.service.getTours().subscribe(data => {
        this.TourList = data;
        console.log(data);
        console.log(this.TourList);
      });
  }

  onFilter(data: Tour[]) {
    // Asigna los resultados del filtro a la variable
    this.TourList = data;
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
  getDurationString(days: number) {
    return days > 0 ? 'Duration: ' + days + ' Days' : 'Single Day';
  }
}

import { Component } from '@angular/core';
import { Tour } from '../models/tour';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Place } from '../models/hotel';
import { TourFilter } from '../models/tourFilter';
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
    this.service.getTours(new TourFilter()).subscribe(data => {
        this.TourList = data;
        console.log(data);
        console.log(this.TourList);
      });
  }
  

  onFilter(data: Tour[]) {
    // Asigna los resultados del filtro a la variable
    this.TourList = data;
  }

  openOfferList(tourId: number) {
    console.log(tourId);
    this.router.navigate(['ShowHotelOffers'], { queryParams: { offerId: tourId, offerType: 'tour' } });
  }

  getDayOfWeek(day: number): string {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(0);
    date.setDate(day);
    return daysOfWeek[date.getDay()];
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

import { Component } from '@angular/core';
import { Hotel } from '../models/hotel';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Offer } from '../models/offer';
import { Flight } from '../models/flight';
import { Tour } from '../models/tour';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  hotels: Hotel[] = [];
  flights: Flight[] = [];
  tours: Tour[] = [];
  packages: Offer[] = [];

  responsiveOptions: any[] | undefined;
  interval: number = 3000;

  constructor(private service: SharedService, private router: Router) { }

  ngOnInit() {
    this.service.getHotelMostSolds().subscribe(data => { this.hotels = data });
    this.service.getFlightMostSolds().subscribe(data => { this.flights = data });
    this.service.getTourMostSolds().subscribe(data => { this.tours = data });
    this.service.getPackageMostSolds().subscribe(data => { this.packages = data });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  openHotelOfferList(id: number) {
    this.router.navigate(['ShowHotelOffers'], { queryParams: { offerId: id, offerType: 'hotel' } });
  }
  openFlightOfferList(id: number) {
    this.router.navigate(['ShowHotelOffers'], { queryParams: { offerId: id, offerType: 'flight' } });
  }
  openTourOfferList(id: number) {
    this.router.navigate(['ShowHotelOffers'], { queryParams: { offerId: id, offerType: 'tour' } });
  }
  getDurationString(days: number) {
    return days > 0 ? 'Duration: ' + days + ' Days' : 'Single Day';
  }
}

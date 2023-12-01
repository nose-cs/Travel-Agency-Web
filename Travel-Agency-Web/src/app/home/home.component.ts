import { Component } from '@angular/core';
import { Hotel } from '../models/hotel';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Offer } from '../models/offer';
import { Flight } from '../models/flight';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  hotels: Hotel[] = [];
  flights: Flight[] = [];
  packages: Offer[] = [];

  responsiveOptions: any[] | undefined;
  interval: number = 3000;

  constructor(private service: SharedService, private router: Router) { }

  ngOnInit() {
    this.service.getHotelMostSolds().subscribe(data => { this.hotels = data });
    this.service.getFlightMostSolds().subscribe(data => { this.flights = data });
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
    this.router.navigate(['ShowHotelOffers'], { queryParams: { hotelId: id } });
  }
  openFlightOfferList(id: number) {
    this.router.navigate(['ShowHotelOffers'], { queryParams: { hotelId: id } });
  }
  openTourOfferList(id: number) {
    
  }
}

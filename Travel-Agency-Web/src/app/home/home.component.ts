import { Component } from '@angular/core';
import { Hotel } from '../models/hotel';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Offer } from '../models/offer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  hotels: Hotel[] = [];
  packages: Offer[] = [];

  responsiveOptions: any[] | undefined;
  interval: number = 3000;

  constructor(private service: SharedService, private router: Router) { }

  ngOnInit() {
    this.service.getHotelMostSolds().subscribe(data => { this.hotels = data });
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

  openOfferList(hotelId: number) {
    this.router.navigate(['ShowHotelOffers'], { queryParams: { hotelId: hotelId } });
  }
}

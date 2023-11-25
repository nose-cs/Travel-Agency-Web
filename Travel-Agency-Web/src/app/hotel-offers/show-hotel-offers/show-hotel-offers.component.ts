import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Offer } from '../../models/offer';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-hotel-offers',
  templateUrl: './show-hotel-offers.component.html',
  styleUrls: ['./show-hotel-offers.component.css']
})
export class ShowHotelOffersComponent implements OnInit {

  layout: 'list' | 'grid' = 'list';

  constructor(private service: SharedService, private route: ActivatedRoute ) { }

  hotelID!: number;

  HotelOffersList: Offer[] = [];


  ngOnInit() {
    this.hotelID = +this.route.snapshot.queryParamMap.get('hotelId')!;
    console.log(this.hotelID);
    this.refreshHotelOffersList();
  }
  

  refreshHotelOffersList() {
    this.service.getIdHotelOffers(this.hotelID).subscribe(data => {
      this.HotelOffersList = data;
      console.log(data);
    });
}

  openOffer(id: number) {
    console.log(id);
  }

  openHotel(id: number) {
    console.log(id);
  }

  openAgency(id: number) {
    console.log(id);
  }
}

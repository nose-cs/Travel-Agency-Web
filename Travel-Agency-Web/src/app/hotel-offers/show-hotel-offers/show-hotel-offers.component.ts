import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Offer } from '../../models/offer';

@Component({
  selector: 'app-show-hotel-offers',
  templateUrl: './show-hotel-offers.component.html',
  styleUrls: ['./show-hotel-offers.component.css']
})
export class ShowHotelOffersComponent implements OnInit {

  constructor(private service: SharedService) { }

  HotelOffersList: Offer[] = [];

  page = 1;
  pageSize = 20;
  collectionSize = 0;

  ngOnInit(): void {
      this.refreshHotelOffersList();
  }

  refreshHotelOffersList() {
      this.service.getHotelOffers().subscribe(data => {
        this.HotelOffersList = data.map((offer, i) => ({ i: i + 1, ...offer })).slice(
          (this.page - 1) * this.pageSize,
          (this.page - 1) * this.pageSize + this.pageSize,
        );


        this.collectionSize = data.length;
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

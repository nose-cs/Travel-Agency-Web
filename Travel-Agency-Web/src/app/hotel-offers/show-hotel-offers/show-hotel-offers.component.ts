import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-hotel-offers',
  templateUrl: './show-hotel-offers.component.html',
  styleUrls: ['./show-hotel-offers.component.css']
})
export class ShowHotelOffersComponent implements OnInit {

  constructor(private service: SharedService) { }

  HotelOffersList: any = [];

  ngOnInit(): void {
      this.refreshHotelOffersList();
  }

  refreshHotelOffersList() {
      this.service.getHotelOffers().subscribe(data => {
        this.HotelOffersList = data;
      });
  }

}

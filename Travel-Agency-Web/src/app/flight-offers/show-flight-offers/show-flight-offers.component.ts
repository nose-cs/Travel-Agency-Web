import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Offer } from '../../models/offer';
@Component({
  selector: 'app-show-flight-offers',
  templateUrl: './show-flight-offers.component.html',
  styleUrls: ['./show-flight-offers.component.css']
})
export class ShowFlightOffersComponent {
  constructor(private service: SharedService) { }

  FlightOffersList: Offer[] = [];
  ngOnInit(): void {
    this.refreshFlightOffersList();
  }
    refreshFlightOffersList() {
      this.service.getFlightOffers().subscribe(data => {
        this.FlightOffersList = data;
      });
  }
}



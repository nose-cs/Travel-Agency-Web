import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Offer } from '../../models/offer';
import { HotelFilter } from 'src/app/models/filterMapper';
import { HttpParams } from '@angular/common/http';
import { filter } from 'rxjs';
@Component({
  selector: 'app-show-flight-offers',
  templateUrl: './show-flight-offers.component.html',
  styleUrls: ['./show-flight-offers.component.css']
})
export class ShowFlightOffersComponent {
  constructor(private service: SharedService) { }
  showFilter: boolean = false;
  selectedOffer?: Offer;
  FlightOffersList: Offer[] = [];


  showOfferDetails(offer: Offer) {
    this.selectedOffer = offer;
  }

  ngOnInit(): void {
    let filter: HotelFilter;

// Me creo un filtro vacio  
        filter = {
          productId: null,
          startDate: null,
          startPrice: null,
          endPrice: null,
          agencyId: null,
          hotelName: null
        };
        this.service.getFlightOffers(filter).subscribe(data => {
          this.FlightOffersList = data;
        });
  }
  onFilter(data: any[]) {
    // Asigna los resultados del filtro a la variable
    this.FlightOffersList = data;
  }
}
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

  layout: 'list' | 'grid' = 'grid';

  constructor(private service: SharedService, private route: ActivatedRoute ) { }

  offerID!: number; 
  offerType!: string;
  OffersList: Offer[] = [];


  ngOnInit() {
    this.offerID = +this.route.snapshot.queryParamMap.get('offerId')!;
    this.offerType = this.route.snapshot.queryParamMap.get('offerType')!;
    console.log(this.offerID)
    this.refreshHotelOffersList();
  }

  onFilter(data: Offer[]) {
    // Asigna los resultados del filtro a la variable
    this.OffersList = data;
  }
  

  refreshHotelOffersList() {
    if(this.offerType == 'hotel'){
    this.service.getIdHotelOffers(this.offerID).subscribe(data => {
      this.OffersList = data;
    });
  }
    if(this.offerType == 'flight'){
      this.service.getIdFlightOffers(this.offerID).subscribe(data => {
        this.OffersList = data;
      });
    }
    if(this.offerType == 'tour'){
      this.service.getIdTourOffers(this.offerID).subscribe(data => {
        this.OffersList = data;
      })
    }
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

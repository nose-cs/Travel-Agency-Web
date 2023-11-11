import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Offer } from '../../models/offer';
import { HotelFilter } from 'src/app/models/filterMapper';
import { HttpParams } from '@angular/common/http';
import { filter } from 'rxjs';


@Component({
  selector: 'app-show-hotel-offers',
  templateUrl: './show-hotel-offers.component.html',
  styleUrls: ['./show-hotel-offers.component.css']
})
export class ShowHotelOffersComponent implements OnInit {

  constructor(private service: SharedService) { }
  showFilter: boolean = false;
  HotelOffersList: Offer[] = [];

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
        this.service.getHotelOffers(filter).subscribe(data => {
          this.HotelOffersList = data;
        });
  }
  onFilter(data: any[]) {
    // Asigna los resultados del filtro a la variable
    this.HotelOffersList = data;
  }

}

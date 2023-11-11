import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Offer } from '../../models/offer';
import { HotelFilter } from 'src/app/models/filterMapper';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-show-hotel-offers',
  templateUrl: './show-hotel-offers.component.html',
  styleUrls: ['./show-hotel-offers.component.css']
})
export class ShowHotelOffersComponent implements OnInit {

  constructor() { }
  showFilter: boolean = false;
  HotelOffersList: Offer[] = [];

  ngOnInit(): void {
  }
  onFilter(data: any[]) {
    // Asigna los resultados del filtro a la variable
    this.HotelOffersList = data;
  }

}

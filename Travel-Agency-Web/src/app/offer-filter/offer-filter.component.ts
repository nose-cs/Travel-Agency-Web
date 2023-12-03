import { Component, Output,EventEmitter, Input } from '@angular/core';
import { OfferFilter } from '../models/offerFilter';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { Offer } from '../models/offer';
import { HotelFilter } from '../models/hotelFilter';


@Component({
  selector: 'app-offer-filter',
  templateUrl: './offer-filter.component.html',
  styleUrls: ['./offer-filter.component.css']
})

export class OfferFilterComponent {

  startPrice!:number;
  endPrice!:number;
  capacity!:number
  startDate!:Date
  endDate!:Date

  constructor(private http: HttpClient, private service: SharedService) {}
  
  // Usa un evento para enviar los resultados del filtro al componente padre
  @Output() filterResults = new EventEmitter<OfferFilter>();

  onSubmit() {
    const filter = new OfferFilter;

    filter.startPrice = this.startPrice;
    filter.endPrice = this.endPrice;
    filter.capacity = this.capacity;

onSubmit() {
  const filter = new OfferFilter;
  // Llama al servicio con el filtro y emite el evento con los resultados
  filter.startPrice = this.startPrice;
  filter.endPrice = this.endPrice;
  filter.capacity = this.capacity;
  filter.startDate = this.startDate;
  filter.endDate = this.endDate;
  this.service.getOffersWithFilter(filter, this.offerType)!.subscribe(data => {
  this.filterResults.emit(data);
  });
}
    this.filterResults.emit(filter);
  }
}

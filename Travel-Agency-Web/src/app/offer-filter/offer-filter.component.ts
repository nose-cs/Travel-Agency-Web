import { Component, Output,EventEmitter, Input } from '@angular/core';
import { OfferFilter } from '../models/offerFilter';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
import { Offer } from '../models/offer';


@Component({
  selector: 'app-offer-filter',
  templateUrl: './offer-filter.component.html',
  styleUrls: ['./offer-filter.component.css']
})

export class OfferFilterComponent {

  name!: string;
  address!: string;
  category!: string;

  constructor(private http: HttpClient, private service: SharedService) {}
  
  // Usa un evento para enviar los resultados del filtro al componente padre
  @Output() filterResults = new EventEmitter<Offer[]>();

  @Input() idHotel!: number;

onSubmit(filter: OfferFilter) {
  // Llama al servicio con el filtro y emite el evento con los resultados
  console.log(filter)
  this.service.getHotelOffersWithFilter(this.idHotel, filter).subscribe(data => {
  this.filterResults.emit(data);
  });
}
}

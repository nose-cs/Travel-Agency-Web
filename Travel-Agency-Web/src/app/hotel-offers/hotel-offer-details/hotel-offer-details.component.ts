import { Component, Input } from '@angular/core';
import { Offer } from 'src/app/models/offer'; 
import * as $ from 'jquery';
import 'bootstrap';

@Component({
  selector: 'app-hotel-offer-details',
  templateUrl: './hotel-offer-details.component.html',
  styleUrls: ['./hotel-offer-details.component.css']
})
export class HotelOfferDetailsComponent {
  @Input() offer: Offer | undefined;

  constructor() { }

  ngOnInit(): void {
    // Abre la ventana emergente al inicializar el componente
    $('#exampleModal').modal('show');
  }
}

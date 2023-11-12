import { Component, Input } from '@angular/core';
import { Offer } from 'src/app/models/offer';
@Component({
  selector: 'app-hotel-offer-details',
  templateUrl: './hotel-offer-details.component.html',
  styleUrls: ['./hotel-offer-details.component.css']
})
export class HotelOfferDetailsComponent {
  @Input() offer!: Offer;
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-hotel-offer-form',
  templateUrl: './add-hotel-offers.component.html',
  styleUrls: ['./add-hotel-offers.component.css']
})
export class AddHotelOffersComponent {
  offer = {
    description: '',
    price: 0,
    capacity: 0,
    startDate: '',
    endDate: '',
    agencyId: 0,
    productId: 0
  };

  constructor(private service: SharedService) { }

  onSubmit() {
  //  this.service.postHotelOffers(this.offer).subscribe(() => {
   //   console.log('Oferta de hotel agregada con éxito');
   // });
  }
}

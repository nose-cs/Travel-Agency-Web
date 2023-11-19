import { Component, EventEmitter, Output } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Offer } from '../../models/offer';
import { HotelFilter } from '../../models/hotelFilter';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Hotel } from '../../models/hotel';

@Component({
  selector: 'app-create-hotel-offers',
  templateUrl: './create-hotel-offers.component.html',
  styleUrls: ['./create-hotel-offers.component.css']
})
export class CreateHotelOffersComponent {

  selectedHotel: { id: number, name: string } | undefined;
  suggestions: { id: number, name: string }[] = [];

  inputTitle: string | undefined;
  inputPrice: number = 0;
  inputCapacity: number = 0;
  inputStartDate: Date | undefined;
  inputEndDate: Date | undefined;
  inputDescription: string | undefined;

  errorLabel: string = '';

  constructor(private service: SharedService, public ref: DynamicDialogRef) { }

  searchHotel(event: any) {
    const filter = new HotelFilter();
    filter.hotelName = event.query;

    this.service.getHotelsWithFilter(filter).subscribe(
      hotels => { this.suggestions = hotels.map(hotel => { return { id: hotel.id, name: hotel.name }; }); }
    );
  }

  onOk() {
    const hotelOffer = new Offer();

    hotelOffer.title = this.inputTitle;
    hotelOffer.capacity = this.inputCapacity!;
    hotelOffer.price = this.inputPrice;
    hotelOffer.description = this.inputDescription;
    hotelOffer.startDate = this.inputStartDate;
    hotelOffer.endDate = this.inputEndDate;
    hotelOffer.productId = this.selectedHotel?.id!;

    this.service.createHotelOffer(hotelOffer).subscribe(
      () => { this.ref.close(); },
      error => {
        if (error.error.errors) {
          let err = '';

          for (let errs of Object.values(error.error.errors)) {
            for (let e of <Array<string>>errs) {
              err += e + '\n';
            }
          }

          this.errorLabel = err;
        }
        else
          this.errorLabel = error.error;
      },
      () => { }
    );
  }
}

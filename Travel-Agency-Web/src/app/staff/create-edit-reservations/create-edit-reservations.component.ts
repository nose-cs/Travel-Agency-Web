import { Component, EventEmitter, Output } from '@angular/core';
import { Reservation } from '../../models/reservation';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-edit-reservations',
  templateUrl: './create-edit-reservations.component.html',
  styleUrls: ['./create-edit-reservations.component.css']
})
export class CreateEditReservationsComponent {

  selectedModel: { id: number, title: string, price: number } | undefined;
  suggestions: { id: number, title: string , price: number}[] = [];

  id: number = 0;
  inputTouristId: number = 0;
  inputDepartureDate: Date | undefined;
  inputArrivalDate: Date | undefined;
  inputNumberofTravellers: number = 0;
  inputPaymentFormat: string = "Cash";
  inputPrice: number = 0;
  errorLabel: string = '';

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig)
  {
    const reservation : Reservation = config.data['reservation'];

    this.id = reservation.id;
    this.inputTouristId = reservation.touristId;
    this.inputNumberofTravellers = reservation.numberofTravellers;
    this.inputPaymentFormat = reservation.paymentFormat;

    if (reservation.departureDate) {
      this.inputDepartureDate = new Date(reservation.departureDate.toString());
    }
    if (reservation.arrivalDate) {
      this.inputArrivalDate = new Date(reservation.arrivalDate.toString());
    }
    if (reservation.offerId && reservation.offerTitle)
    {
      this.setSelectedModel(reservation.offerId, reservation.offerTitle);
    }
  }
  async setSelectedModel(offerId: number, offerTitle: string) {
    this.suggestions = await this.config.data['filter'](offerTitle);

    this.selectedModel = this.suggestions.find(sugg => sugg.id == offerId);
    if (this.selectedModel)
      this.inputPrice = this.selectedModel.price;
  }

  async searchModel(event: any) {
    this.suggestions = await this.config.data['filter'](event.query);
  }

  capturePrice(event: any)
  {
    if (this.selectedModel)
      this.inputPrice = this.selectedModel.price*this.inputNumberofTravellers;
  }

  onOk() {
    const reservation = new Reservation();

    reservation.id = this.id;
    reservation.touristId = this.inputTouristId;
    reservation.departureDate = this.inputDepartureDate;
    reservation.arrivalDate = this.inputArrivalDate;
    reservation.numberofTravellers = this.inputNumberofTravellers;
    reservation.paymentFormat = this.inputPaymentFormat;
    console.log(reservation.paymentFormat);

    if (this.selectedModel)
    {
      reservation.offerId = this.selectedModel.id;
      reservation.offerTitle = this.selectedModel.title
      reservation.price = this.selectedModel.price;
    }
    else {
      this.errorLabel = "Please select an offer";
      return;
    }

    this.config.data['execute'](reservation).subscribe(
      () => { this.ref.close(true); },
      (error: any) => {
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
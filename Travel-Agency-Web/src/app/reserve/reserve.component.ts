import { Component } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedService } from '../shared.service';
import { Reservation } from '../models/reservation';
import { ShowCalendarComponent } from '../show-calendar/show-calendar.component';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent {

  constructor(private service: SharedService, private dialogService: DialogService, private ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  inputDeparture: string | undefined;
  inputArrival: string | undefined;

  numberofTravellers: number = 1;
  creditCard: string | undefined;

  errorLabel: string = '';

  refchangeDate: DynamicDialogRef | undefined;

  onOk()
  {
    if (this.inputArrival == undefined || this.inputDeparture == undefined) {
      this.errorLabel = "Please select a valid Departure and Arrival";
      return;
    }

    if (this.creditCard == undefined) {
      this.errorLabel = 'Please enter a valid credit card';
      return;
    }

    const reservation = new Reservation();

    reservation.departureDate = new Date(this.inputDeparture);
    reservation.arrivalDate = new Date(this.inputArrival);
    reservation.creditCard = this.creditCard;
    reservation.numberofTravellers = this.numberofTravellers;
    reservation.offerId = this.config.data['offerId'];

    this.service.createReservation(reservation, this.config.data['product']).subscribe(
      () => { this.ref.close(); },
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
      }
    );
  }

  openCalendarDialog(field: string) {
    switch (field) {
      case 'StartDate':
        this.refchangeDate = this.dialogService.open(ShowCalendarComponent, {
          data: {
            date: this.inputDeparture ? new Date(this.inputDeparture) : undefined
          },
          header: 'Select a departure date',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true
        });

        this.refchangeDate.onClose.subscribe((date: Date | undefined) => {
          if (date) {
            this.inputDeparture = date.toDateString();
          }
        })
        break;

      case 'EndDate':
        this.refchangeDate = this.dialogService.open(ShowCalendarComponent, {
          data: {
            date: this.inputArrival ? new Date(this.inputArrival) : undefined
          },
          header: 'Select an arrival date',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true
        });

        this.refchangeDate.onClose.subscribe((date: Date | undefined) => {
          if (date) {
            this.inputArrival = date.toDateString();
          }
        })
        break;
    }
  }
}

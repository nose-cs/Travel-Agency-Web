import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Reservation } from '../../models/reservation';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateEditReservationsComponent } from '../create-edit-reservations/create-edit-reservations.component';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-show-staff-reservations',
  templateUrl: './show-staff-reservations.component.html',
  styleUrls: ['./show-staff-reservations.component.css'],
  providers: [ ConfirmationService ]
})
export class ShowStaffReservationsComponent {

  constructor(private service: SharedService, private dialogService: DialogService, private confirmationService: ConfirmationService, public config: DynamicDialogConfig) { }

  ReservationList: Reservation[] = [];

  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this.refreshTable();
  }

  refreshTable() {
    this.config.data['getReservationList'].subscribe(
        (result: Reservation[]) => { this.ReservationList = result; }
    );
  }

  editReservation(reservation: Reservation) {
    this.ref = this.dialogService.open(CreateEditReservationsComponent, {
      data: {
        reservation: reservation,
        execute: (reservation: Reservation) => this.config.data['editReservation'](reservation),
        filter: this.config.data['productFilter']
      },
      header: 'Edit ' + this.config.data['reservationName'] + ' reservation',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });

    this.ref.onClose.subscribe((reload : any) =>
    {
      if(reload)
        this.refreshTable();
    });
  }

  deleteReservation(reservation: Reservation) {
    this.confirmationService.confirm({
      message: 'Do you want to delete the reservation'/* + .id + ' - ' + offer.title + '?'*/,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.config.data['deleteOffer'](reservation.id).subscribe(() => { this.refreshTable(); });
      }
    });
  }
}
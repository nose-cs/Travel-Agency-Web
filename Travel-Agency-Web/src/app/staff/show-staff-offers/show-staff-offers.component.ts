import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Offer } from '../../models/offer';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateEditOffersComponent } from '../create-edit-offers/create-edit-offers.component';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-show-staff-offers',
  templateUrl: './show-staff-offers.component.html',
  styleUrls: ['./show-staff-offers.component.css'],
  providers: [ ConfirmationService ]
})
export class ShowStaffHotelOffersComponent {

  constructor(private service: SharedService, private dialogService: DialogService, private confirmationService: ConfirmationService, public config: DynamicDialogConfig) { }

  OfferList: Offer[] = [];

  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this.refreshTable();
  }

  refreshTable() {
    this.config.data['getOfferList'].subscribe(
        (result: Offer[]) => { this.OfferList = result; }
    );
  }

  editOffer(offer: Offer) {
    this.ref = this.dialogService.open(CreateEditOffersComponent, {
      data: {
        offer: offer,
        execute: (offer: Offer) => this.config.data['editOffer'](offer),
        filter: this.config.data['productFilter']
      },
      header: 'Edit ' + this.config.data['offerName'] + ' offer',
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

  deleteOffer(offer: Offer) {
    this.confirmationService.confirm({
      message: 'Do you want to delete the offer ' + offer.id + ' - ' + offer.title + '?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.config.data['deleteOffer'](offer.id).subscribe(() => { this.refreshTable(); });
      }
    });
  }
}

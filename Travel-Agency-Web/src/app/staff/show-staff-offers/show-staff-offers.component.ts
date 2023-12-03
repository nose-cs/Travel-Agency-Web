import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Offer } from '../../models/offer';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateEditOffersComponent } from '../create-edit-offers/create-edit-offers.component';
import { ConfirmationService } from 'primeng/api';
import { OfferFilter } from '../../models/offerFilter';
import { PaginatorState } from 'primeng/paginator';
import { PaginationResponse } from '../../models/PaginationResponse';
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

  first: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  total: number = 0;

  filter: OfferFilter = new OfferFilter();

  ngOnInit() {
    this.refreshTable();
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first!;
    this.pageSize = event.rows!;
    this.pageIndex = event.page! + 1;
    this.refreshTable();
  }

  refreshTable() {
    this.filter.pageIndex = this.pageIndex;
    this.filter.pageSize = this.pageSize;

    this.config.data['getOfferList'](this.filter).subscribe((paginator: PaginationResponse<Offer>) => {
      this.OfferList = paginator.items;

      this.total = paginator.totalCollectionSize;
    });
  }

  editOffer(offer: Offer) {
    this.ref = this.dialogService.open(CreateEditOffersComponent, {
      data: {
        offerName: this.config.data['offerName'],
        offer: offer,
        execute: this.config.data['editOffer'],
        filter: this.config.data['productFilter'],
        filterFacility: this.config.data['filterFacility']
      },
      header: 'Edit ' + this.config.data['offerName'] + ' offer',
      contentStyle: { overflow: this.config.data['offerName'] == 'Package' ? 'auto' : 'visible' },
      width: this.config.data['offerName'] == 'Package' ? '80%' : undefined,
      maximizable: this.config.data['offerName'] == 'Package'
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

import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Offer } from '../../models/offer';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateEditOffersComponent } from '../../create-edit-offers/create-edit-offers.component';
import { ConfirmationService } from 'primeng/api';
import { HotelFilter } from '../../models/hotelFilter';
import { Hotel } from '../../models/hotel';

@Component({
  selector: 'app-show-staff-hotel-offers',
  templateUrl: './show-staff-hotel-offers.component.html',
  styleUrls: ['./show-staff-hotel-offers.component.css'],
  providers: [ ConfirmationService ]
})
export class ShowStaffHotelOffersComponent {

  constructor(private service: SharedService, private dialogService: DialogService, private confirmationService: ConfirmationService) { }

  HotelOfferList: Offer[] = [];

  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this.refreshTable();
  }

  refreshTable() {
    this.service.getHotelOffers().subscribe(
      result => { this.HotelOfferList = result; }
    );
  }

  editOffer(offer: Offer) {
    this.ref = this.dialogService.open(CreateEditOffersComponent, {
      data: {
        offer: offer,
        execute: (offer: Offer) => this.service.editHotelOffer(offer),
        filter: (query: string) => {
          const filter = new HotelFilter();
          filter.hotelName = query;

          let suggestions: { id: number, name: string }[] = [];
          this.service.getHotelsWithFilter(filter).subscribe(
            (hotels: Hotel[]) => {
              for(let sugg of hotels.map(hotel => { return { id: hotel.id, name: hotel.name }; }))
              {
                suggestions.push(sugg);
              }
            }
          );

          return suggestions;
        }
      },
      header: 'Edit Hotel offer',
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
        this.service.deleteHotelOffer(offer.id).subscribe(() => { this.refreshTable(); });
      }
    });
  }
}

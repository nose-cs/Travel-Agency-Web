import { Component } from '@angular/core';
import { Offer } from '../../models/offer';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateEditOffersComponent } from '../../create-edit-offers/create-edit-offers.component';
import { ShowStaffHotelOffersComponent } from '../../hotel-offers/show-staff-hotel-offers/show-staff-hotel-offers.component';
import { SharedService } from '../../shared.service';
import { HotelFilter } from '../../models/hotelFilter';
import { Hotel } from '../../models/hotel';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css'],
  providers: [DialogService]
})
export class MarketingComponent {

  constructor(private service: SharedService, private router: Router, private dialogService: DialogService) { }

  OffersControlItems: string[] = ["Hotel Offers", "Flight Offers", "Tour Offers", "Packages"];

  ref: DynamicDialogRef | undefined;

  redirect(offerModel: string, action: string) {

    switch (offerModel) {
      case "Hotel Offers":

        switch (action) {
          case "Create":
            const offer = new Offer();

            this.ref = this.dialogService.open(CreateEditOffersComponent, {
              data: {
                offer: offer,
                execute: (hotelOffer: Offer) => this.service.createHotelOffer(hotelOffer),
                filter: async (query: string) => {
                  const filter = new HotelFilter();
                  filter.hotelName = query;

                  let suggestions: { id: number, name: string }[] = [];

                  let promise = new Promise<void>((resolve, reject) => {
                    this.service.getHotelsWithFilter(filter).subscribe(
                      (hotels: Hotel[]) => {
                        for (let sugg of hotels.map(hotel => { return { id: hotel.id, name: hotel.name }; })) {
                          suggestions.push(sugg);
                        }

                        resolve();
                      },
                      (error) => {
                        reject(error);
                      }
                    );
                  }
                  );

                  await promise;

                  return suggestions;
                }
              },
              header: 'Create a Hotel offer',
              contentStyle: { overflow: 'auto' },
              baseZIndex: 10000,
              maximizable: false
            });
            break;

          case "Manage":
            this.ref = this.dialogService.open(ShowStaffHotelOffersComponent, {
              contentStyle: { overflow: 'auto' },
              baseZIndex: 10000,
              width: '70%',
              maximizable: true
            });
            break;
        }

        break;
    }

  }
}

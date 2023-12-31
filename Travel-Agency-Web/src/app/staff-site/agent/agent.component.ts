import {Component} from '@angular/core';
import {Reservation} from 'src/app/models/reservation';
import {Router} from '@angular/router';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {CreateEditReservationsComponent} from '../../staff/create-edit-reservations/create-edit-reservations.component';
import {SharedService} from '../../shared.service';
import {OfferFilter} from '../../models/offerFilter';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css'],
  providers: [DialogService]
})
export class AgentComponent {
  ReservationsControlItems: string[] = ["Hotel Reservations", "Flight Reservations", "Tour Reservations", "Packages Reservations"];

  ref: DynamicDialogRef | undefined;

  constructor(private service: SharedService, private router: Router, private dialogService: DialogService) {
  }

  redirect(offerModel: string, action: string) {

    switch (offerModel) {
      case "Hotel Reservations":

        switch (action) {
          case "Create":
            const reservation = new Reservation();

            this.ref = this.dialogService.open(CreateEditReservationsComponent, {
              data: {
                reservation: reservation,
                execute: (hotelReservation: Reservation) => this.service.createReservation(hotelReservation, "hotel"),
                filter: async (query: string) => {
                  const filter = new OfferFilter();
                  filter.title = query;
                  filter.agencyId = Number.parseInt(localStorage.getItem('agencyId')!);

                  let suggestions: { id: number, title: string | undefined, price: number }[] = [];

                  let promise = new Promise<void>((resolve, reject) => {
                      this.service.getOffersWithFilter(filter, "hotel")!.subscribe(
                        offers => {
                          for (let sugg of offers.items.map(offer => {
                            return {id: offer.id, title: offer.title, price: offer.price};
                          })) {
                            suggestions.push(sugg);
                          }

                          resolve();
                        },
                        (error) => {
                          reject(error);
                        }
                      );
                    }
                  )
                  await promise;

                  return suggestions;
                }
              },
              header: 'Create a Hotel Reservation',
              contentStyle: {overflow: 'auto'},
              baseZIndex: 10000,
              maximizable: false
            });
            break;
        }
        break;

      case "Flight Reservations":

        switch (action) {
          case "Create":
            const reservation = new Reservation();

            this.ref = this.dialogService.open(CreateEditReservationsComponent, {
              data: {
                reservation: reservation,
                execute: (flightReservation: Reservation) => this.service.createReservation(flightReservation, "flight"),
                filter: async (query: string) => {
                  const filter = new OfferFilter();
                  filter.title = query;
                  filter.agencyId = Number.parseInt(localStorage.getItem('agencyId')!);

                  let suggestions: { id: number, title: string | undefined, price: number }[] = [];

                  let promise = new Promise<void>((resolve, reject) => {
                      this.service.getOffersWithFilter(filter, "flight")!.subscribe(
                        offers => {
                          for (let sugg of offers.items.map(offer => {
                            return {id: offer.id, title: offer.title, price: offer.price};
                          })) {
                            suggestions.push(sugg);
                          }

                          resolve();
                        },
                        (error) => {
                          reject(error);
                        }
                      );
                    }
                  )
                  await promise;

                  return suggestions;
                }
              },
              header: 'Create a Flight Reservation',
              contentStyle: {overflow: 'auto'},
              baseZIndex: 10000,
              maximizable: false
            });
            break;

        }

        break;

      case "Tour Reservations":

        switch (action) {
          case "Create":
            const reservation = new Reservation();

            this.ref = this.dialogService.open(CreateEditReservationsComponent, {
              data: {
                reservation: reservation,
                execute: (hotelReservation: Reservation) => this.service.createReservation(hotelReservation, "tour"),
                filter: async (query: string) => {
                  const filter = new OfferFilter();
                  filter.title = query;
                  filter.agencyId = Number.parseInt(localStorage.getItem('agencyId')!);

                  let suggestions: { id: number, title: string | undefined, price: number }[] = [];

                  let promise = new Promise<void>((resolve, reject) => {
                      this.service.getOffersWithFilter(filter, "tour")!.subscribe(
                        offers => {
                          for (let sugg of offers.items.map(offer => {
                            return {id: offer.id, title: offer.title, price: offer.price};
                          })) {
                            suggestions.push(sugg);
                          }

                          resolve();
                        },
                        (error) => {
                          reject(error);
                        }
                      );
                    }
                  )
                  await promise;

                  return suggestions;
                }
              },
              header: 'Create a Tour Reservation',
              contentStyle: {overflow: 'auto'},
              baseZIndex: 10000,
              maximizable: false
            });
            break;
        }

        break;
    }

  }
}

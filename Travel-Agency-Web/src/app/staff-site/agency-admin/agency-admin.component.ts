import {Component} from '@angular/core';
import {SharedService} from "../../shared.service";
import {Router} from '@angular/router';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {GroupBy} from "../../models/salesStatistics";
import {Offer} from "../../models/offer";
import {CreateEditOffersComponent} from "../../staff/create-edit-offers/create-edit-offers.component";
import {HotelFilter} from "../../models/hotelFilter";
import {Hotel} from "../../models/hotel";
import {OfferFilter} from "../../models/offerFilter";
import {ShowStaffHotelOffersComponent} from "../../staff/show-staff-offers/show-staff-offers.component";
import {AgencyUser, Role} from "../../models/agencyUser";
import {CreateAgencyUserComponent} from "../../staff/create-agency-user/create-agency-user.component";
import {ShowAgencyUsersComponent} from "../../staff/show-agency-users/show-agency-users.component";

@Component({
  selector: 'app-agency-admin',
  templateUrl: './agency-admin.component.html',
  styleUrls: ['./agency-admin.component.css'],
  providers: [DialogService]
})
export class AgencyAdminComponent {
  constructor(private service: SharedService, private router: Router, private dialogService: DialogService) { }

  ref: DynamicDialogRef | undefined;

  groups: { name: string, value: number }[] = [{ name: 'Day', value: GroupBy.Day }, { name: 'Month', value: GroupBy.Month }, { name: 'Year', value: GroupBy.Year }];
  ngOnInit() {
  }

  onChangeRequest(model: string) {
  }

  redirect(action: string) {

        switch (action) {
          case "Create":
            this.ref = this.dialogService.open(CreateAgencyUserComponent, {
              data: {
                agencyUser: {} as AgencyUser,
                execute: (agencyUser: AgencyUser) => this.service.createAgencyUser(agencyUser)
              },
              header: 'Create a new user for your agency',
              contentStyle: { overflow: 'auto' },
              baseZIndex: 10000,
              maximizable: false
            });
            break;

          case "Manage":
            const agencyId = Number.parseInt(localStorage.getItem('agencyId')!);

            this.ref = this.dialogService.open(ShowAgencyUsersComponent, {
              data: {
                getUserList: this.service.getAgencyUsers(agencyId),
                editAgencyUser: (offer: Offer) => this.service.editHotelOffer(offer),
                deleteAgencyUser: (id: number) => this.service.deleteHotelOffer(id),

                productFilter: async (query: string) => {
                  const filter = new HotelFilter();
                  filter.hotelName = query;

                  let suggestions: { id: number, name: string }[] = [];

                  let promise = new Promise<void>((resolve, reject) => {
                      this.service.getHotelsWithFilter(filter).subscribe(
                        (hotels: Hotel[]) => {
                          for (let sugg of hotels.map(hotel => { return { id: hotel.id, name: hotel.name + ' - ' + hotel.address.city }; })) {
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
              contentStyle: { overflow: 'auto' },
              baseZIndex: 10000,
              width: '80%',
              maximizable: true
            });
            break;
        }
    }
}


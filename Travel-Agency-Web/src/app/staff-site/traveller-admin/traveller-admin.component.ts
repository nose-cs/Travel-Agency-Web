import {Component} from '@angular/core';
import {SharedService} from "../../shared.service";
import {CreateEditUserComponent} from "../../staff/create-edit-user/create-edit-user.component";
import {AgencyUser, Role} from "../../models/agencyUser";
import {ShowAgencyUsersComponent} from "../../staff/show-agency-users/show-agency-users.component";
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Router} from '@angular/router';
import {CreateEditAgencyComponent} from "../../staff/create-edit-agency/create-edit-agency.component";
import {ShowAgenciesComponent} from "../../staff/show-agencies/show-agencies.component";
import {Agency} from "../../models/agency";
import {CreateEditHotelComponent} from "../../staff/create-edit-hotel/create-edit-hotel.component";
import {ShowHotelsComponent} from "../../staff/show-hotels/show-hotels.component";
import {Hotel} from "../../models/hotel";
import {HotelFilter} from "../../models/hotelFilter";
import {CreateEditTourComponent} from "../../staff/create-edit-tour/create-edit-tour.component";
import {ShowToursComponent} from "../../staff/show-tours/show-tours.component";
import {CreateEditFlightComponent} from "../../staff/create-edit-flight/create-edit-flight.component";
import {ShowFlightsComponent} from "../../staff/show-flights/show-flights.component";
import {Flight} from "../../models/flight";
import {Tour} from "../../models/tour";
import { Pagination } from '../../models/pagination';

@Component({
  selector: 'app-traveller-admin',
  templateUrl: './traveller-admin.component.html',
  styleUrls: ['./traveller-admin.component.css'],
  providers: [DialogService]
})
export class TravellerAdminComponent {
  constructor(private service: SharedService, private router: Router, private dialogService: DialogService) {
  }

  ref: DynamicDialogRef | undefined;

  redirectAgencyUser(action: string) {
    switch (action) {
      case "Create":
        this.ref = this.dialogService.open(CreateEditUserComponent, {
          data: {
            agencyUser: {} as AgencyUser,
            roles: [
              {role: Role.AgencyAdmin, name: "Admin"},
              {role: Role.Agent, name: "Agent"},
              {role: Role.MarketingEmployee, name: "Marketing"}],
            execute: (agencyUser: AgencyUser, agencyId: number) => this.service.createAgencyUser(agencyUser, agencyId)
          },
          header: 'Create a new agency employee',
          contentStyle: {overflow: 'auto'},
          baseZIndex: 10000,
          maximizable: false
        });
        break;

      case "Manage":
        this.ref = this.dialogService.open(ShowAgencyUsersComponent, {
          data: {
            getUserList: (filter: Pagination) => this.service.getAllAgencyUsers(filter),
            editAgencyUser: (agencyUser: AgencyUser) => this.service.editAgencyUser(agencyUser, agencyUser.agencyId),
            deleteAgencyUser: (id: number, agencyId: number) => this.service.deleteAgencyUser(agencyId, id),
            roles: [
              {role: Role.AgencyAdmin, name: "Admin"},
              {role: Role.Agent, name: "Agent"},
              {role: Role.MarketingEmployee, name: "Marketing"}
            ],
          },
          contentStyle: {overflow: 'auto'},
          baseZIndex: 10000,
          width: '80%',
          maximizable: true
        });
        break;
    }
  }

  redirectAgency(action: string) {
    switch (action) {
      case "Create":
        this.ref = this.dialogService.open(CreateEditAgencyComponent, {
          data: {
            agency: {} as Agency,
            execute: (agency: Agency) => this.service.createAgency(agency)
          },
          header: 'Create a new agency',
          contentStyle: {overflow: 'auto'},
          baseZIndex: 10000,
          maximizable: false
        });
        break;

      case "Manage":
        this.ref = this.dialogService.open(ShowAgenciesComponent, {
          data: {
            getAgencyList: (filter: Pagination) => this.service.getAgencies(filter),
            editAgency: (agency: Agency, id: number) => this.service.editAgency(agency, id),
            deleteAgency: (id: number) => this.service.deleteAgency(id),
          },
          contentStyle: {overflow: 'auto'},
          baseZIndex: 10000,
          width: '80%',
          maximizable: true
        });
        break;
    }
  }

  redirectHotel(action: string) {
    switch (action) {
      case "Create":
        this.ref = this.dialogService.open(CreateEditHotelComponent, {
          data: {
            hotel: {},
            execute: (hotel: Hotel) => this.service.createHotel(hotel)
          },
          header: 'Create a new hotel',
          contentStyle: {overflow: 'auto'},
          baseZIndex: 10000,
          maximizable: false
        });
        break;

      case "Manage":
        this.ref = this.dialogService.open(ShowHotelsComponent, {
          data: {
            getHotelList: this.service.getHotels({} as HotelFilter),
            editHotel: (hotel: Hotel, id: number) => this.service.editHotel(hotel, id),
            deleteHotel: (id: number) => this.service.deleteHotel(id),
          },
          contentStyle: {overflow: 'auto'},
          baseZIndex: 10000,
          width: '80%',
          maximizable: true
        });
        break;
    }
  }

  redirectTour(action: string) {
    switch (action) {
      case "Create":
        this.ref = this.dialogService.open(CreateEditTourComponent, {
          data: {
            tour: {} as Tour,
            execute: (tour: Tour) => this.service.createTour(tour)
          },
          header: 'Create a new tour',
          contentStyle: {overflow: 'auto'},
          baseZIndex: 10000,
          maximizable: false
        });
        break;

      case "Manage":
        this.ref = this.dialogService.open(ShowToursComponent, {
          data: {
            getHotelList: this.service.getHotels({} as HotelFilter),
            editHotel: (hotel: Hotel, id: number) => this.service.editHotel(hotel, id),
            deleteHotel: (id: number) => this.service.deleteHotel(id),
          },
          contentStyle: {overflow: 'auto'},
          baseZIndex: 10000,
          width: '80%',
          maximizable: true
        });
        break;
    }
  }

  redirectFlight(action: string) {
    switch (action) {
      case "Create":
        this.ref = this.dialogService.open(CreateEditFlightComponent, {
          data: {
            flight: {} as Flight,
            execute: (flight: Flight) => this.service.createFlight(flight)
          },
          header: 'Create a new flight',
          contentStyle: {overflow: 'auto'},
          baseZIndex: 10000,
          maximizable: false
        });
        break;

      case "Manage":
        this.ref = this.dialogService.open(ShowFlightsComponent, {
          data: {
            getHotelList: this.service.getHotels({} as HotelFilter),
            editHotel: (hotel: Hotel, id: number) => this.service.editHotel(hotel, id),
            deleteHotel: (id: number) => this.service.deleteHotel(id),
          },
          contentStyle: {overflow: 'auto'},
          baseZIndex: 10000,
          width: '80%',
          maximizable: true
        });
        break;
    }
  }
}


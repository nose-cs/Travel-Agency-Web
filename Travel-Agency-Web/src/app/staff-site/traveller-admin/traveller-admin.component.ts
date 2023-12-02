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
            getUserList: this.service.getAllAgencyUsers(),
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
            getAgencyList: this.service.getAgency(),
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
}


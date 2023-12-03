import {Component} from '@angular/core';
import {SharedService} from "../../shared.service";
import {Router} from '@angular/router';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {AgencyUser, Role} from "../../models/agencyUser";
import {CreateEditUserComponent} from "../../staff/create-edit-user/create-edit-user.component";
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

  redirect(action: string) {
        switch (action) {
          case "Create":
            this.ref = this.dialogService.open(CreateEditUserComponent, {
              data: {
                agencyUser: {agencyId: Number.parseInt(localStorage.getItem('agencyId')!)} as AgencyUser,
                roles: [ {role: Role.AgencyAdmin, name: "Admin"},
                          {role: Role.Agent, name: "Agent"},
                          {role: Role.MarketingEmployee, name: "Marketing"}],
                execute: (agencyUser: AgencyUser, agencyId: number) => this.service.createAgencyUser(agencyUser, agencyId)
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
                editAgencyUser: (agencyUser: AgencyUser) => this.service.editAgencyUser(agencyUser, agencyId),
                deleteAgencyUser: (id: number, agencyId: number) => this.service.deleteAgencyUser(agencyId, id),
                roles: [
                  {role: Role.AgencyAdmin, name: "Admin"},
                  {role: Role.Agent, name: "Agent"},
                  {role: Role.MarketingEmployee, name: "Marketing"}
                ],
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


import {Component} from '@angular/core';
import {SharedService} from "../../shared.service";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';
import {AgencyUser, Role} from "../../models/agencyUser";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";

@Component({
  selector: 'app-show-agency-users',
  templateUrl: './show-agency-users.component.html',
  styleUrls: ['./show-agency-users.component.css'],
  providers: [ConfirmationService]
})
export class ShowAgencyUsersComponent {
  constructor(private service: SharedService, private dialogService: DialogService, private confirmationService: ConfirmationService, private config: DynamicDialogConfig) {
    this.roles = this.config.data['roles'];
  }

  AgencyUserList: AgencyUser[] = [];
  roles: { role: Role; name: string } [] | undefined
  currentUserRole: string | null = localStorage.getItem('role');

  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this.refreshTable();
  }

  refreshTable() {
    this.config.data['getUserList'].subscribe(
      (result: AgencyUser[]) => {
        this.AgencyUserList = result;
      }
    );
  }

  getRole(role: Role | undefined) {
    return this.roles?.find(r => r.role == role)?.name;
  }

  editAgencyUser(agencyUser: AgencyUser) {
    this.ref = this.dialogService.open(CreateEditUserComponent, {
      data: {
        agencyUser: agencyUser,
        roles: this.roles,
        execute: (agencyUser: AgencyUser) => this.config.data['editAgencyUser'](agencyUser)
      },
      header: 'Edit ' + agencyUser.name + ' info',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000,
      maximizable: false
    });

    this.ref.onClose.subscribe((reload: any) => {
      if (reload)
        this.refreshTable();
    });
  }

  deleteAgencyUser(agencyUser: AgencyUser) {
    this.confirmationService.confirm({
      message: 'Do you want to delete the user ' + agencyUser.name + '?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.config.data['deleteAgencyUser'](agencyUser.id, agencyUser.agencyId).subscribe(() => {
          this.refreshTable();
        });
      }
    });
  }
}

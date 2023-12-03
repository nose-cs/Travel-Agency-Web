import {Component} from '@angular/core';
import {SharedService} from "../../shared.service";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';
import {AgencyUser, Role} from "../../models/agencyUser";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import { PaginatorState } from 'primeng/paginator';
import { PaginationResponse } from '../../models/PaginationResponse';
import { Pagination } from '../../models/pagination';

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

  first: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  total: number = 0;

  orders: string[] = ["Lastest", "Oldest", "Name A-Z", "Name Z-A", "Email A-Z", "Email Z-A", "Newest Agency", "Oldest Agency"];
  inputOrder: string = this.orders[0];

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
    const filter = new Pagination();
    filter.pageIndex = this.pageIndex;
    filter.pageSize = this.pageSize;

    switch (this.inputOrder) {
      case "Lastest":
        filter.orderBy = "Id";
        filter.descending = true;
        break;
      case "Oldest":
        filter.orderBy = "Id";
        filter.descending = false;
        break;
      case "Name Z-A":
        filter.orderBy = "Name";
        filter.descending = true;
        break;
      case "Name A-Z":
        filter.orderBy = "Name";
        filter.descending = false;
        break;
      case "Email Z-A":
        filter.orderBy = "Email";
        filter.descending = true;
        break;
      case "Email A-Z":
        filter.orderBy = "Email";
        filter.descending = false;
        break;
      case "Newest Agency":
        filter.orderBy = "AgencyId";
        filter.descending = true;
        break;
      case "Oldest Agency":
        filter.orderBy = "AgencyId";
        filter.descending = false;
        break;
    }

    this.config.data['getUserList'](filter).subscribe(
      (paginator: PaginationResponse<AgencyUser>) => {
        this.AgencyUserList = paginator.items;
        this.total = paginator.totalCollectionSize;
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

  changeOrder() {
    this.pageIndex = 1;
    this.first = 0;
    this.refreshTable();
  }
}

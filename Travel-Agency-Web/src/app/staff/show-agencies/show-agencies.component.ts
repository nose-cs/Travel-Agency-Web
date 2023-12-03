import {Component} from '@angular/core';
import {SharedService} from "../../shared.service";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';
import {Agency} from "../../models/agency";
import {CreateEditAgencyComponent} from "../create-edit-agency/create-edit-agency.component";
import { Pagination } from '../../models/pagination';
import { PaginatorState } from 'primeng/paginator';
import { PaginationResponse } from '../../models/PaginationResponse';

@Component({
  selector: 'app-show-agencies',
  templateUrl: './show-agencies.component.html',
  styleUrls: ['./show-agencies.component.css'],
  providers: [ConfirmationService]
})
export class ShowAgenciesComponent {
  constructor(private service: SharedService, private dialogService: DialogService, private confirmationService: ConfirmationService,
              private config: DynamicDialogConfig) {}

  AgencyList: Agency[] = [];

  ref: DynamicDialogRef | undefined;

  errorLabel: string | undefined;

  first: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  total: number = 0;

  orders: string[] = ["Lastest", "Oldest", "Name A-Z", "Name Z-A", "Email A-Z", "Email Z-A"];
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
    }

    this.config.data['getAgencyList'](filter).subscribe(
      (paginator: PaginationResponse<Agency>) => {
        this.AgencyList = paginator.items;
        this.total = paginator.totalCollectionSize;
      }
    );
  }

  editAgency(agency: Agency) {
    this.ref = this.dialogService.open(CreateEditAgencyComponent, {
      data: {
        agency: agency,
        execute: (agency: Agency) => this.config.data['editAgency'](agency, agency.id)
      },
      header: 'Edit ' + agency.name + ' info',
      contentStyle: {overflow: 'auto'},
      baseZIndex: 10000,
      maximizable: false
    });

    this.ref.onClose.subscribe((reload: any) => {
      if (reload)
        this.refreshTable();
    });
  }

  deleteAgency(agency: Agency) {
    this.confirmationService.confirm({
      message: 'Do you want to delete the agency ' + agency.name + '? This action will delete all offers related with the agency.',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.config.data['deleteAgency'](agency.id).subscribe(() => {
          this.refreshTable(),
            (error: any) => {
              if (!error?.error?.errors) {
                let err = '';

                for (let errs of Object.values(error.error.errors)) {
                  for (let e of <Array<string>>errs) {
                    err += e + '\n';
                  }
                }

                this.errorLabel = err;
              } else
                this.errorLabel = error.error;
            },
            () => {
            }
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

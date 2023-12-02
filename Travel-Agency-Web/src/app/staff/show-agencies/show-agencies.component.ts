import {Component} from '@angular/core';
import {SharedService} from "../../shared.service";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {ConfirmationService} from 'primeng/api';
import {Agency} from "../../models/agency";
import {CreateEditAgencyComponent} from "../create-edit-agency/create-edit-agency.component";

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

  ngOnInit() {
    this.refreshTable();
  }

  refreshTable() {
    this.config.data['getAgencyList'].subscribe(
      (result: Agency[]) => {
        this.AgencyList = result;
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
      message: 'Do you want to delete the user ' + agency.name + '?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.config.data['deleteAgency'](agency.id).subscribe(() => {
          this.refreshTable();
        });
      }
    });
  }
}

import {Component} from '@angular/core';
import {AgencyUser, Role} from "../../models/agencyUser";
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Agency} from "../../models/agency";

@Component({
  selector: 'app-create-edit-agency',
  templateUrl: './create-edit-agency.component.html',
  styleUrls: ['./create-edit-agency.component.css']
})
export class CreateEditAgencyComponent {
  id: number = 0;
  inputName: string | undefined;
  inputFax: string | undefined;
  inputEmail: string | undefined;
  inputAddress: string | undefined;
  inputCity: string | undefined;
  inputCountry: string | undefined;

  errorLabel: string = '';

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    if (config.data['agency']) {
      const agency: Agency = config.data['agency'];

      this.id = agency.id;
      this.inputName = agency.name;
      this.inputFax = agency.fax;
      this.inputEmail = agency.email;
      this.inputAddress = agency.address?.address;
      this.inputCity = agency.address?.city;
      this.inputCountry = agency.address?.country;
    }
  }

  onOk() {
    if (!this.inputName || !this.inputEmail || !this.inputFax || !this.inputCountry || !this.inputCity || !this.inputAddress) {
      this.errorLabel = "Please fill all fields";
      return;
    }

    if (!this.inputEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      this.errorLabel = "Please enter a valid email";
      return;
    }

    const agency = {
      id: this.id,
      name: this.inputName,
      fax: this.inputFax,
      email: this.inputEmail,
      address: {
        address: this.inputAddress,
        city: this.inputCity,
        country: this.inputCountry
      }
    } as Agency;

    this.config.data['execute'](agency).subscribe(
      () => {
        this.ref.close(true);
      },
      (error: any) => {
        if (error?.error?.errors) {
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
    );
  }

  protected readonly Role = Role;
}


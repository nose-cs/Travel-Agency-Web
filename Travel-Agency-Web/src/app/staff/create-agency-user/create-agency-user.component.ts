import {Component} from '@angular/core';
import {AgencyUser, Role} from "../../models/agencyUser";
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-agency-user',
  templateUrl: './create-agency-user.component.html',
  styleUrls: ['./create-agency-user.component.css']
})
export class CreateAgencyUserComponent {
  roles: {role: Role.AgencyAdmin | Role.MarketingEmployee | Role.Agent; name: string} [] | undefined
  id: number = 0;
  inputName: string | undefined;
  inputRole: {role: Role.AgencyAdmin | Role.MarketingEmployee | Role.Agent; name: string} | undefined;
  inputEmail: string | undefined;
  inputPassword: string | undefined;

  errorLabel: string = '';

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    if (config.data['agencyUser']) {
      const agencyUser: AgencyUser = config.data['agencyUser'];

      this.id = agencyUser?.id;
      this.inputName = agencyUser?.name;
      this.inputRole = this.getRole(agencyUser?.role);
      this.inputEmail = agencyUser?.email;
    }
  }

  getRole(role: Role | undefined) {
    return this.roles?.find(r => r.role == role);
  }

  ngOnInit() {
    this.roles = [
      {role: Role.AgencyAdmin, name: "Admin"},
      {role: Role.Agent, name: "Agent"},
      {role: Role.MarketingEmployee, name: "Marketing"},
    ];
  }

  onOk() {
    if (!this.inputName || !this.inputRole || !this.inputEmail || !this.inputPassword) {
      this.errorLabel = "Please fill all fields";
      return;
    }

    if (!this.inputEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      this.errorLabel = "Please enter a valid email";
      return;
    }

    const agencyIdString = localStorage.getItem('agencyId');

    if (!agencyIdString) {
      this.errorLabel = "Error with your credentials. Please login again";
      return;
    }

    const agencyId = Number.parseInt(agencyIdString);

    const agencyUser = {
      agencyId: agencyId,
      name: this.inputName,
      role: this.inputRole.role,
      email: this.inputEmail,
      password: this.inputPassword
    } as AgencyUser;

    this.config.data['execute'](agencyUser).subscribe(
      () => { this.ref.close(true); },
      (error: any) => {
        if (error.error.errors) {
          let err = '';

          for (let errs of Object.values(error.error.errors)) {
            for (let e of <Array<string>>errs) {
              err += e + '\n';
            }
          }

          this.errorLabel = err;
        }
        else
          this.errorLabel = error.error;
      },
      () => { }
    );
  }

}

import {Component} from '@angular/core';
import {AgencyUser, Role} from "../../models/agencyUser";
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.css']
})
export class CreateEditUserComponent {
  roles: {role: Role; name: string} [] | undefined;
  id: number = 0;
  inputName: string | undefined;
  inputRole: {role: Role; name: string} | undefined;
  inputEmail: string | undefined;
  inputPassword: string | undefined;
  inputAgencyId: number | undefined;

  currentUserRole: string | null = localStorage.getItem('role');

  errorLabel: string = '';

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    if (config.data['roles']) {
      this.roles = config.data['roles'];
    }

    if (localStorage.getItem('role') == 'AgencyAdmin') {
      this.inputAgencyId = Number.parseInt(localStorage.getItem('agencyId')!);
    }

    if (config.data['agencyUser']) {
      const agencyUser: AgencyUser = config.data['agencyUser'];
      this.id = agencyUser?.id;
      this.inputName = agencyUser?.name;
      this.inputRole = this.getRole(agencyUser?.role);
      this.inputEmail = agencyUser?.email;
      this.inputAgencyId = agencyUser?.agencyId;
    }
  }

  getRole(role: Role) {
    return this.roles!.find(r => r.role === role);
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

    const agencyUser = {
      id: this.id,
      name: this.inputName,
      role: this.inputRole.role,
      email: this.inputEmail,
      password: this.inputPassword,
      agencyId: this.inputAgencyId
    } as AgencyUser;

    this.config.data['execute'](agencyUser, this.inputAgencyId).subscribe(
      () => { this.ref.close(true); },
      (error: any) => {
        if (error?.error?.errors) {
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

  protected readonly Role = Role;
}

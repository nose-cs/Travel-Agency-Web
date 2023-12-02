import { Component } from '@angular/core';
import { ChangePasswordRequest } from '../models/changePasswordRequest';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-user-site',
  templateUrl: './user-site.component.html',
  styleUrls: ['./user-site.component.css']
})
export class UserSiteComponent {

  name: string | null = '';
  email: string | null = '';
  password: string = '************';
  role: string | null = '';
  country: string | null = null;

  inputOldPassword: string = '';
  inputNewPassword: string = '';

  errorLabel: string = '';

  visibleDialogChangePassword: boolean = false;

  currentActiveIndex: number = 0;
  historyActiveIndex: number = 0;

  constructor(private service: SharedService) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.role = localStorage.getItem('role');
    this.country = localStorage.getItem('country');
  }

  dismissDialogChangePassword() {
    this.inputNewPassword = '';
    this.inputOldPassword = '';
    this.errorLabel = '';
  }

  showDialogChangePassword() {
    this.visibleDialogChangePassword = true;
  }

  changePasswordFun() {
    let changePassdto = new ChangePasswordRequest();

    changePassdto.newPassword = this.inputNewPassword;
    changePassdto.oldPassword = this.inputOldPassword;

    this.service.changePassword(changePassdto).subscribe(
      jwtAuth => {
        localStorage.setItem('jwtToken', jwtAuth.token);
        this.visibleDialogChangePassword = false;
        this.dismissDialogChangePassword();
        this.ngOnInit();
      },
      error => {
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

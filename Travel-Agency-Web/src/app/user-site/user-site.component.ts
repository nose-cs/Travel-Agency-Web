import { Component } from '@angular/core';
import { ChangePasswordRequest } from '../models/changePasswordRequest';
import { SharedService } from '../shared.service';
import { Reservation } from '../models/reservation';
import { PaginatorState } from 'primeng/paginator';

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

  CurrentHotels: Reservation[] = [];

  firstCurrentHotel: number = 0;
  pageIndexCurrentHotel: number = 1;
  pageSizeCurrentHotel: number = 10;
  totalCurrentHotel: number = 0;

  orders: string[] = ["Lastest", "Oldest", "Name A-Z", "Name Z-A", "Bigger Category", "Smaller Category"];
  inputOrderCurrentHotel: string = this.orders[0];

  constructor(private service: SharedService) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
    this.role = localStorage.getItem('role');
    this.country = localStorage.getItem('country');
  }

  onPageChangeCurrentHotel(event: PaginatorState) {
    this.firstCurrentHotel = event.first!;
    this.pageSizeCurrentHotel = event.rows!;
    this.pageIndexCurrentHotel = event.page! + 1;
    //this.refreshHotelList();
  }

  changeOrderCurrentHotel() {
    this.pageIndexCurrentHotel = 1;
    this.firstCurrentHotel = 0;
    //this.refreshHotelList();
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

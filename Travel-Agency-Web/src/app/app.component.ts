import { Component } from '@angular/core';
import { Login } from './models/login';
import { Register } from './models/register';
import { JwtAuth } from './models/jwtAuth';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Travel-Agency-Web';

  constructor(private service: SharedService, private router: Router) { }

  menuItems: MenuItem[] | undefined;
  activeMenuItem: MenuItem | undefined;

  username: string | null = null;

  visible: boolean = false;

  errorLabel: string = '';

  inputEmail: string = '';
  inputPassword: string = '';

  ngOnInit(): void {

    this.username = null;

    const token = localStorage.getItem('jwtToken');

    try {
      if (token) {
        const parts = token.split('.');
        const payload = parts[1];
        const decoded = atob(payload);

        const data = JSON.parse(decoded);

        const exp = new Date(data.exp * 1000);
        const now = new Date();

        if (now < exp)
          this.username = data.name;
        else
          localStorage.setItem('jwtToken', null!);
      }
    }
    catch { }

    this.menuItems = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/Home'] },
      { label: 'Hotels', icon: 'pi pi-fw pi-building', routerLink: ['/HotelOffers'] },
      { label: 'Flights', icon: 'pi pi-fw pi-cloud', routerLink: ['/FlightOffers'] }
    ];

    this.activeMenuItem = this.menuItems[0];
  }

  registerFun(registerDto: Register) {
    this.service.register(registerDto).subscribe();
  }
  loginFun() {
    let loginDto = new Login(); 

    loginDto.email = this.inputEmail;
    loginDto.password = this.inputPassword;

    this.service.login(loginDto).subscribe(
      jwtAuth => {
        localStorage.setItem('jwtToken', jwtAuth.token);
        this.visible = false;
        this.dismissDialogLogin();
        this.ngOnInit();
      },
      error => {
        localStorage.setItem('jwtToken', null!);

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

  logoutFun() {
    localStorage.setItem('jwtToken', null!);
    this.ngOnInit();
  }

  showDialogLogin() {
    this.visible = true;
  }

  dismissDialogLogin() {
    this.inputEmail = '';
    this.inputPassword = '';
    this.errorLabel = '';
  }

  onActiveMenuItemChange(event: MenuItem) {
    this.activeMenuItem = event;
  }
}

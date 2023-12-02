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

  constructor(private service: SharedService, public router: Router) { }

  menuItems: MenuItem[] | undefined;
  activeMenuItem: MenuItem | undefined;

  username: string | null = null;
  role: string | null = null;

  visibleLogin: boolean = false;
  visibleRegister: boolean = false;

  errorLabel: string = '';

  inputName: string = '';
  inputCountry: string = '';
  inputEmail: string = '';
  inputPassword: string = '';

  ngOnInit(): void {

    if (this.router.url == '' || this.router.url == '/')
      this.router.navigateByUrl('/Home');

    this.checkToken();

    this.menuItems = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/Home'] },
      { label: 'Hotels', icon: 'pi pi-fw pi-building', routerLink: ['/Hotels'] },
      { label: 'Flights', icon: 'pi pi-fw pi-cloud', routerLink: ['/Flights'] },
      { label: 'Tours', routerLink: ['/Tours']}
    ];

    this.activeMenuItem = this.menuItems[0];

  }

  checkToken() {
    this.username = null;
    this.role = null;

    const token = localStorage.getItem('jwtToken');

    try {
      if (token) {
        const parts = token.split('.');
        const payload = parts[1];
        const decoded = atob(payload);

        const data = JSON.parse(decoded);

        const exp = new Date(data.exp * 1000);
        const now = new Date();

        if (now < exp) {
          this.username = data.name;
          this.role = data.role;

          localStorage.setItem('role', this.role!);
          localStorage.setItem('agencyId', data.agencyId);
        }
        else {
          localStorage.setItem('jwtToken', null!);
          localStorage.setItem('role', null!);
          localStorage.setItem('agencyId', null!);
        }
      }
    }
    catch { }
  }

  registerFun() {
    let registerDto = new Register();

    registerDto.name = this.inputName;
    registerDto.country = this.inputCountry;
    registerDto.email = this.inputEmail;
    registerDto.password = this.inputPassword;

    this.service.register(registerDto).subscribe(
      jwtAuth => {
        localStorage.setItem('jwtToken', jwtAuth.token);
        this.visibleRegister = false;
        this.dismissDialogRegister();
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
  loginFun() {
    let loginDto = new Login();

    loginDto.email = this.inputEmail;
    loginDto.password = this.inputPassword;

    this.service.login(loginDto).subscribe(
      jwtAuth => {
        localStorage.setItem('jwtToken', jwtAuth.token);
        this.visibleLogin = false;
        this.dismissDialogLogin();
        this.checkToken();
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
    this.router.navigate(['/Home']).then(() => {
      location.reload();
    });
  }

  showDialogLogin() {
    this.visibleLogin = true;
  }

  showDialogRegister() {
    this.visibleRegister = true;
  }

  dismissDialogLogin() {
    this.inputEmail = '';
    this.inputPassword = '';
    this.errorLabel = '';
  }

  dismissDialogRegister() {
    this.inputName = '';
    this.inputCountry = '';
    this.inputEmail = '';
    this.inputPassword = '';
    this.errorLabel = '';
  }

  onActiveMenuItemChange(event: MenuItem) {
    this.activeMenuItem = event;
  }
}

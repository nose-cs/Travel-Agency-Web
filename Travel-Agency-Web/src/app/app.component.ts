import { Component } from '@angular/core';
import { Login } from './models/login';
import { Register } from './models/register';
import { JwtAuth } from './models/jwtAuth';
import { SharedService } from './shared.service';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Travel-Agency-Web';

  constructor(private service: SharedService, private offcanvasService: NgbOffcanvas, private modalService: NgbModal, private router: Router) { }

  username: string | null = null;

  ngOnInit(): void {

    const token = localStorage.getItem('jwtToken');

    if (token) {
      const parts = token.split('.');
      const payload = parts[1];
      const decoded = atob(payload);

      const data = JSON.parse(decoded);

      const exp = new Date(data.exp * 1000);
      const now = new Date();

      if(now < exp)
        this.username = data.name;
      else
        localStorage.setItem('jwtToken', null!);
    }
  }

  registerFun(registerDto: Register) {
    this.service.register(registerDto).subscribe();
  }
  loginFun() {
    let loginDto = new Login(); 

    loginDto.email = (<HTMLInputElement>document.getElementById("inputEmail")).value;
    loginDto.password = (<HTMLInputElement>document.getElementById("inputPassword")).value;

    this.service.login(loginDto).subscribe(
      jwtAuth => {
        localStorage.setItem('jwtToken', jwtAuth.token);
        this.modalService.dismissAll();
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

          (<HTMLLabelElement>document.getElementById("errorLabel")).innerHTML = err;
        }
        else
          (<HTMLLabelElement>document.getElementById("errorLabel")).innerHTML = error.error;
      },
      () => { }
    );
  }

  openHNav(content: any) {
    this.offcanvasService.open(content, { position: 'end' , ariaLabelledBy: 'offcanvas-basic-title' });
  }

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }


}

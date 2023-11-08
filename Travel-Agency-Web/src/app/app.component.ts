import { Component } from '@angular/core';
import { Login } from './models/login';
import { Register } from './models/register';
import { JwtAuth } from './models/jwtAuth';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Travel-Agency-Web';

  loginDto = new Login();
  registerDto = new Register();
  jwtDto = new JwtAuth();

  constructor(private service: SharedService) { }

  register(registerDto: Register) {
    this.service.register(registerDto).subscribe();
  }
  login(loginDto: Login) {
    this.service.login(loginDto).subscribe(jwtDto => {
      localStorage.setItem('jwtToken', jwtDto.token);
    });
  }
}

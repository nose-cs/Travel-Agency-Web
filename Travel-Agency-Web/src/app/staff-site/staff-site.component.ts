import { Component } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-site',
  templateUrl: './staff-site.component.html',
  styleUrls: ['./staff-site.component.css']
})
export class StaffSiteComponent {

  role: string = '';

  constructor(private service: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role')!;

    if (this.role == 'Tourist') {
      this.router.navigateByUrl('/Home');
    }
  }

}

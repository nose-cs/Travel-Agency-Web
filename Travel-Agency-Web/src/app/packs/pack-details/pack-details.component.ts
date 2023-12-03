import {Component} from '@angular/core';
import {Offer} from "../../models/offer";
import {Tour} from "../../models/tour";
import {FacilityFilter, PackageFacility} from "../../models/package";
import {SharedService} from "../../shared.service";
import {DialogService, DynamicDialogRef, DynamicDialogConfig} from 'primeng/dynamicdialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pack-details',
  templateUrl: './pack-details.component.html',
  styleUrls: ['./pack-details.component.css']
})
export class PackDetailsComponent {

  Pack!: Offer;
  tours!: Tour[];
  facilities!: PackageFacility[];

  constructor(private service: SharedService, private router: Router, public dialogService: DialogService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    if (config.data['product']) {
      this.Pack = config.data['product'];
    }
  }

  ngOnInit(): void {
    this.getDetails();

  }

  getDetails() {
    this.service.getPackageTours(this.Pack.id).subscribe(data => {
      this.tours = data;
    });
    let filter = new FacilityFilter;
    // filter.idPack = this.Pack.id;
    this.service.getPackageFacilities(this.Pack.id).subscribe(data => {
      this.facilities = data;
    })
  }

  getDayOfWeek(day: number): string {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(0);
    date.setDate(day);
    return daysOfWeek[date.getDay()];
  }

  getDurationString(days: number) {
    return days > 0 ? 'Duration: ' + days + ' Days' : 'Single Day';
  }
}

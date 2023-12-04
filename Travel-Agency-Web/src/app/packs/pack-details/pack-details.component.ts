import {Component} from '@angular/core';
import {Offer} from "../../models/offer";
import {Tour} from "../../models/tour";
import {FacilityFilter, PackageFacility} from "../../models/package";
import {SharedService} from "../../shared.service";
import {DialogService, DynamicDialogRef, DynamicDialogConfig} from 'primeng/dynamicdialog';
import {Router} from '@angular/router';
import {Hotel, Place } from 'src/app/models/hotel';

@Component({
  selector: 'app-pack-details',
  templateUrl: './pack-details.component.html',
  styleUrls: ['./pack-details.component.css']
})
export class PackDetailsComponent {

  Pack!: Offer;
  tours!: Tour[];
  hotels!: Hotel[]
  facilities!: PackageFacility[];

  constructor(private service: SharedService, private router: Router, public dialogService: DialogService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    if (config.data['product']) {
      this.Pack = config.data['product'];
    }
  }

  ngOnInit(): void {
    this.getDetails();
  }

  getStars(category: number): string {
  
    return '⭐'.repeat(category);
  }
  getAddres(place: Place) {
    return place.address + ', ' + place.city + ', ' + place.country;
  }

  getDetails() {
    this.service.getPackageTours(this.Pack.id).subscribe(data => {
      this.tours = data;
    });
    let filter = new FacilityFilter;
    // filter.idPack = this.Pack.id;
    this.service.getPackageFacilities(this.Pack.id).subscribe(data => {
      this.facilities = data;

this.service.getPackageHotels(this.Pack.id).subscribe(data => {
  this.hotels = data;})})
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

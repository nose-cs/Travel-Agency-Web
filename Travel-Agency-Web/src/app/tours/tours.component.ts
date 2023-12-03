import { Component } from '@angular/core';
import { Tour } from '../models/tour';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Place } from '../models/hotel';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TourHotelsComponent } from './tour-hotels/tour-hotels.component';
import { TourFilter } from '../models/tourFilter';
import { PaginatorState } from 'primeng/paginator';
@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css']
})
export class ToursComponent {
  layout: 'list' | 'grid' = 'list';

  constructor(private service: SharedService, private router: Router, public dialogService: DialogService) { }

  TourList: Tour[] = [];
  ref: DynamicDialogRef| undefined;

  first: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  total: number = 0;

  filter: TourFilter = new TourFilter();

  ngOnInit(): void {
      this.refreshList();
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first!;
    this.pageSize = event.rows!;
    this.pageIndex = event.page! + 1;
    this.refreshList();
  }

  refreshList() {
    this.filter.pageIndex = this.pageIndex;
    this.filter.pageSize = this.pageSize;

    this.service.getTours(this.filter).subscribe(paginator => {
      this.TourList = paginator.items;

      this.total = paginator.totalCollectionSize;
    });
  }

  onFilter(newfilter: TourFilter) {
    this.filter = newfilter;
    this.pageIndex = 1;
    this.first = 0;
    this.refreshList();
  }

  openOfferList(tourId: number) {
    console.log(tourId);
    this.router.navigate(['ShowHotelOffers'], { queryParams: { offerId: tourId, offerType: 'tour' } });
  }

  getDayOfWeek(day: number): string {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(0);
    date.setDate(day);
    return daysOfWeek[date.getDay()];
  }
  openHotelList(id: number) {
    console.log(id);
  }
  show(id: number){
      this.ref = this.dialogService.open(TourHotelsComponent, { data: {id: id},  header: 'Hotels' })
    }

  openAgency(id: number) {
    console.log(id);
  }

  getStars(category: number): string {
  
    return '⭐'.repeat(category);
  }
  getAddres(place: Place) {
    return place.address + ', ' + place.city + ', ' + place.country;
  }
  getDurationString(days: number) {
    return days > 0 ? 'Duration: ' + days + ' Days' : 'Single Day';
  }
}

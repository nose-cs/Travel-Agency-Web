import { Component } from '@angular/core';
import { Place, Hotel } from '../models/hotel';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Flight, FlightFilter } from '../models/flight';
import { PaginatorState } from 'primeng/paginator';
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent {
  layout: 'list' | 'grid' = 'list';

  constructor(private service: SharedService, private router: Router) { }

  name!: string;
  address!: string;
  category!: number;

  FlightList: Flight[] = [];

  first: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  total: number = 0;

  filter: FlightFilter = new FlightFilter();

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

    this.service.getFlights(this.filter).subscribe(paginator => {
      this.FlightList = paginator.items;

      this.total = paginator.totalCollectionSize;
    });
  }

  onFilter(newfilter: FlightFilter) {
    this.filter = newfilter;
    this.pageIndex = 1;
    this.first = 0;
    this.refreshList();
  }

  openOfferList(flightId: number) {
    console.log(flightId);
    this.router.navigate(['ShowHotelOffers'], { queryParams: { offerId: flightId, offerType: 'flight' } });
  }

  openHotel(id: number) {
    console.log(id);
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

}

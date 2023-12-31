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

  orders: string[] = ["Lastest", "Oldest", "Airline A-Z", "Airline Z-A", "Flight 1-9", "Flight 9-1"];
  inputOrder: string = this.orders[0];

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

    switch (this.inputOrder) {
      case "Lastest":
        this.filter.orderBy = "Id";
        this.filter.descending = true;
        break;
      case "Oldest":
        this.filter.orderBy = "Id";
        this.filter.descending = false;
        break;
      case "Airline Z-A":
        this.filter.orderBy = "Airline";
        this.filter.descending = true;
        break;
      case "Airline A-Z":
        this.filter.orderBy = "Airline";
        this.filter.descending = false;
        break;
      case "Flight 9-1":
        this.filter.orderBy = "FlightNumber";
        this.filter.descending = true;
        break;
      case "Flight 1-9":
        this.filter.orderBy = "FlightNumber";
        this.filter.descending = false;
    }

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
    this.router.navigate(['ShowOffers'], { queryParams: { offerId: flightId, offerType: 'flight' } });
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

  changeOrder() {
    this.pageIndex = 1;
    this.first = 0;
    this.refreshList();
  }

}

import { Component } from '@angular/core';
import { Hotel, Place } from 'src/app/models/hotel';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { HotelFilter } from '../../models/hotelFilter';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-show-hotels',
  templateUrl: './show-hotels.component.html',
  styleUrls: ['./show-hotels.component.css']
})
export class ShowHotelsComponent {
  layout: 'list' | 'grid' = 'list';

  constructor(private service: SharedService, private router: Router) { }

  name!: string;
  address!: string;
  category!: number;
  showDetails: boolean = false


  HotelList: Hotel[] = [];

  first: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  total: number = 0;

  orders: string[] = ["Lastest", "Oldest", "Name A-Z", "Name Z-A", "Bigger Category", "Smaller Category"];
  inputOrder: string = this.orders[0];

  filter: HotelFilter = new HotelFilter();

  ngOnInit(): void {
    this.refreshHotelList();
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first!;
    this.pageSize = event.rows!;
    this.pageIndex = event.page! + 1;
    this.refreshHotelList();
  }

  showDialog() {
    this.showDetails = true;
  }

  refreshHotelList() {
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
      case "Name Z-A":
        this.filter.orderBy = "Name";
        this.filter.descending = true;
        break;
      case "Name A-Z":
        this.filter.orderBy = "Name";
        this.filter.descending = false;
        break;
      case "Bigger Category":
        this.filter.orderBy = "Category";
        this.filter.descending = true;
        break;
      case "Smaller Category":
        this.filter.orderBy = "Category";
        this.filter.descending = false;
    }

    this.service.getHotels(this.filter).subscribe(paginator => {
      this.HotelList = paginator.items;

      this.total = paginator.totalCollectionSize;
    });
  }

  onFilter(newfilter: HotelFilter) {
    this.filter = newfilter;
    this.pageIndex = 1;
    this.first = 0;
    this.refreshHotelList();
  }

  openOfferList(hotelId: number) {
    console.log(hotelId);
    this.router.navigate(['ShowHotelOffers'], { queryParams: { offerId: hotelId, offerType: 'hotel' } });
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
    this.refreshHotelList();
  }
}

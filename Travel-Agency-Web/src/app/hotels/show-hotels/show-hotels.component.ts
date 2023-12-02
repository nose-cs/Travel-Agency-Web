import { Component } from '@angular/core';
import { Hotel, Place } from 'src/app/models/hotel';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { HotelFilter } from '../../models/hotelFilter';


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

  HotelList: Hotel[] = [];

  ngOnInit(): void {
      this.refreshHotelList();
  }

  refreshHotelList() {
    this.service.getHotels(new HotelFilter()).subscribe(data => {
        this.HotelList = data;
      });
  }

  onFilter(data: Hotel[]) {
    // Asigna los resultados del filtro a la variable
    this.HotelList = data;
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
}

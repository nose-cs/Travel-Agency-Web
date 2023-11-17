import { Component } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-hotels',
  templateUrl: './show-hotels.component.html',
  styleUrls: ['./show-hotels.component.css']
})
export class ShowHotelsComponent {
  layout: 'list' | 'grid' = 'list';

  constructor(private service: SharedService) { }

  

  HotelList: Hotel[] = [];

  ngOnInit(): void {
      this.refreshHotelList();
  }

  refreshHotelList() {
      this.service.getHotels().subscribe(data => {
        this.HotelList = data;
      });
  }

  openOffer(id: number) {
    console.log(id);
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
}

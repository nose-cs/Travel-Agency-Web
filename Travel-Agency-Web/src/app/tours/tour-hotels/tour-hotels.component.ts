import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Hotel, Place } from 'src/app/models/hotel';
@Component({
  selector: 'app-tour-hotels',
  templateUrl: './tour-hotels.component.html',
  styleUrls: ['./tour-hotels.component.css']
})
export class TourHotelsComponent {

  idTour!: number
  hotelList!: Hotel[]
  constructor(private service: SharedService, private router: Router, public dialogService: DialogService, public ref: DynamicDialogRef, public config: DynamicDialogConfig, private messageService: MessageService) {
    if(config.data['id']) {
      this.idTour = config.data['id'];
      console.log(this.idTour)
    }
  }

  getStars(category: number): string {
  
    return '⭐'.repeat(category);
  }
  getAddres(place: Place) {
    return place.address + ', ' + place.city + ', ' + place.country;
  }

  
  ngOnInit(): void {
    this.service.getTourHotels(this.idTour).subscribe(data => this.hotelList = data );
    

}
}

import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Offer } from '../../models/offer';


@Component({
  selector: 'app-show-tour-offers',
  templateUrl: './show-tour-offers.component.html',
  styleUrls: ['./show-tour-offers.component.css']
})
export class ShowTourOffersComponent {
  constructor(private service: SharedService) { }
  TourOffersList: Offer[] = [];
  ngOnInit(): void {
    this.refreshTourOffersList();
  }

  refreshTourOffersList() {
    this.service.getTourOffers().subscribe(data => {
      this.TourOffersList = data;
    });
 }}








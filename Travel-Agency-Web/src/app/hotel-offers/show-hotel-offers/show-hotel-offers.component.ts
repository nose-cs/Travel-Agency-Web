import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Offer } from '../../models/offer';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OfferFilter } from 'src/app/models/offerFilter';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-show-hotel-offers',
  templateUrl: './show-hotel-offers.component.html',
  styleUrls: ['./show-hotel-offers.component.css']
})
export class ShowHotelOffersComponent implements OnInit {

  layout: 'list' | 'grid' = 'grid';

  constructor(private service: SharedService, private route: ActivatedRoute ) { }

  productId!: number; 
  offerType!: string;
  OffersList: Offer[] = [];
  showDetails: boolean = false;

  first: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  total: number = 0;

  filter: OfferFilter = new OfferFilter();

  ngOnInit() {
    this.productId = +this.route.snapshot.queryParamMap.get('offerId')!;
    this.offerType = this.route.snapshot.queryParamMap.get('offerType')!;

    this.filter.productId = this.productId;

    this.refreshList();
  }
  

  showDialog(){
    this.showDetails = true
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

    this.service.getOffersWithFilter(this.filter, this.offerType).subscribe(paginator => {
      this.OffersList = paginator.items;
      this.total = paginator.totalCollectionSize;
    });
  }

  onFilter(newfilter: OfferFilter) {
    this.filter = newfilter;
    this.filter.productId = this.productId;
    this.pageIndex = 1;
    this.first = 0;
    this.refreshList();
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
}

import { Component } from '@angular/core';
import { Offer } from '../models/offer';
import { OfferFilter } from '../models/offerFilter';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { PackDetailsComponent } from './pack-details/pack-details.component';
@Component({
  selector: 'app-packs',
  templateUrl: './packs.component.html',
  styleUrls: ['./packs.component.css'],
  providers: [DialogService]
})
export class PacksComponent {

  layout: 'list' | 'grid' = 'list';

  ref: DynamicDialogRef| undefined;
  OfferList: Offer[] = [];

  first: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  total: number = 0;

  orders: string[] = ["Lastest", "Oldest", "Bigger Price", "Smaller Price"];
  inputOrder: string = this.orders[0];

  filter: OfferFilter = new OfferFilter();


  constructor(private service: SharedService, private router: Router, public dialogService: DialogService) {}

  ngOnInit(): void {
    this.refreshOfferList();
  }

  refreshOfferList() {
    this.service.getOffersWithFilter(new OfferFilter, 'package')!.subscribe(paginator => {
      this.OfferList = paginator.items;
    });
  }
  show(product: Offer){
    this.ref = this.dialogService.open(PackDetailsComponent, { data: {product: product},  header: 'Package Details', width:'70%' })}

  ReserveOffer(id: number){}

  onFilter(newfilter: OfferFilter) {
    this.filter = newfilter;
    this.pageIndex = 1;
    this.first = 0;
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
      case "Bigger Price":
        this.filter.orderBy = "Price";
        this.filter.descending = true;
        break;
      case "Smaller Price":
        this.filter.orderBy = "Price";
        this.filter.descending = false;
        break;
    }

    this.service.getOffersWithFilter(this.filter, 'package').subscribe(paginator => {
      this.OfferList = paginator.items;
      this.total = paginator.totalCollectionSize;
    });
  }
}

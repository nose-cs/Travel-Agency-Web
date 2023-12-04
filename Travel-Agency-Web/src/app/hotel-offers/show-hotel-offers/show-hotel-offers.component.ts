import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { Offer } from '../../models/offer';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { OfferFilter } from 'src/app/models/offerFilter';
import { PaginatorState } from 'primeng/paginator';
import { DialogService } from 'primeng/dynamicdialog';
import { ReserveComponent } from '../../reserve/reserve.component';

@Component({
  selector: 'app-show-hotel-offers',
  templateUrl: './show-hotel-offers.component.html',
  styleUrls: ['./show-hotel-offers.component.css']
})
export class ShowHotelOffersComponent implements OnInit {

  layout: 'list' | 'grid' = 'grid';

  constructor(private service: SharedService, private route: ActivatedRoute, private dialogService: DialogService) { }

  productId!: number;
  offerType!: string;
  OffersList: Offer[] = [];
  showDetails: boolean = false;

  first: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  total: number = 0;

  orders: string[] = ["Lastest", "Oldest", "Bigger Price", "Smaller Price"];
  inputOrder: string = this.orders[0];

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

  changeOrder() {
    this.pageIndex = 1;
    this.first = 0;
    this.refreshList();
  }

  Reserve(id: number) {
    this.dialogService.open(ReserveComponent, {
      data: {
        product: this.offerType,
        offerId: id
      },
      header: 'Reserve',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });
  }
}

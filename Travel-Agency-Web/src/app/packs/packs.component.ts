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
    this.ref = this.dialogService.open(PackDetailsComponent, { data: {product: product},  header: 'Package Details' })}

  ReserveOffer(id: number){}
}

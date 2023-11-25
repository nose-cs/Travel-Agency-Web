import { Component, ViewChild } from '@angular/core';
import { Offer } from '../../models/offer';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateEditOffersComponent } from '../../staff/create-edit-offers/create-edit-offers.component';
import { ShowStaffHotelOffersComponent } from '../../staff/show-staff-offers/show-staff-offers.component';
import { SharedService } from '../../shared.service';
import { HotelFilter } from '../../models/hotelFilter';
import { Hotel } from '../../models/hotel';
import { GroupBy, SaleRequest, SaleResponse } from '../../models/salesStatistics';
import { UIChart } from 'primeng/chart';
import { group } from '@angular/animations';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css'],
  providers: [DialogService]
})
export class MarketingComponent {
  @ViewChild('SaleChart') _chart: UIChart | undefined; 

  constructor(private service: SharedService, private router: Router, private dialogService: DialogService) { }

  OffersControlItems: string[] = ["Hotel Offers", "Flight Offers", "Tour Offers", "Packages"];

  ref: DynamicDialogRef | undefined;

  dataSales: Record<string, any> = {};
  optionSales: Record<string, any> = {};

  inputStartSales: Record<string, Date> = {};
  inputEndSales: Record<string, Date> = {};

  groupSales: Record<string, string[]> = {};
  totalSales: Record<string, number[]> = {};
  moneySales: Record<string, number[]> = {};

  serviceSales: Record<string, Function> = {};

  groups: { name: string, value: number }[] = [{ name: 'Day', value: GroupBy.Day }, { name: 'Month', value: GroupBy.Month }, { name: 'Year', value: GroupBy.Year }];
  selectedGroup: Record<string, { name: string, value: number }> = {};

  ngOnInit() {
    for (let model of this.OffersControlItems) {
      this.inputStartSales[model] = new Date();
      this.inputEndSales[model] = new Date();

      this.groupSales[model] = [];
      this.totalSales[model] = [];
      this.moneySales[model] = [];

      this.selectedGroup[model] = this.groups[0];

      switch (model) {
        case 'Hotel Offers':
          this.serviceSales[model] = (request: SaleRequest) => this.service.getHotelSales(request);
          break;
        case 'Flight Offers':
          this.serviceSales[model] = (request: SaleRequest) => this.service.getFlightSales(request);
          break;
        case 'Tour Offers':
          this.serviceSales[model] = (request: SaleRequest) => this.service.getTourSales(request);
          break;
        case 'Packages':
          this.serviceSales[model] = (request: SaleRequest) => this.service.getPackageSales(request);
          break;
      }

      this.serviceSales[model]({ start: this.inputStartSales[model], end: this.inputEndSales[model], groupBy: this.selectedGroup[model].value })
        .subscribe((data: SaleResponse[]) => {
          this.groupSales[model] = data.map(sale => sale.group);
          this.totalSales[model] = data.map(sale => sale.total);
          this.moneySales[model] = data.map(sale => sale.moneyAmount);
          this.refreshSales(model);
        });
    }
  }

  onChangeRequest(model: string) {
    this.serviceSales[model]({ start: this.inputStartSales[model], end: this.inputEndSales[model], groupBy: this.selectedGroup[model].value })
      .subscribe((data: SaleResponse[]) => {
        this.groupSales[model] = data.map(sale => sale.group);
        this.totalSales[model] = data.map(sale => sale.total);
        this.moneySales[model] = data.map(sale => sale.moneyAmount);
        this.refreshSales(model);
      });  
  }

  refreshSales(model: string) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const footer = (tooltipItems: any) => {
      return 'Total: ' + this.totalSales[model][tooltipItems[0].dataIndex];
    };

    this.dataSales[model] = {
      labels: this.groupSales[model],
      datasets: [
        {
          label: 'Sales',
          data: this.moneySales[model],
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4
        }
      ]
    };

    this.optionSales[model] = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        },
        tooltip: {
          callbacks: {
            footer: footer,
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  redirect(offerModel: string, action: string) {

    switch (offerModel) {
      case "Hotel Offers":

        switch (action) {
          case "Create":
            const offer = new Offer();

            this.ref = this.dialogService.open(CreateEditOffersComponent, {
              data: {
                offer: offer,
                execute: (hotelOffer: Offer) => this.service.createHotelOffer(hotelOffer),
                filter: async (query: string) => {
                  const filter = new HotelFilter();
                  filter.hotelName = query;

                  let suggestions: { id: number, name: string }[] = [];

                  let promise = new Promise<void>((resolve, reject) => {
                    this.service.getHotelsWithFilter(filter).subscribe(
                      (hotels: Hotel[]) => {
                        for (let sugg of hotels.map(hotel => { return { id: hotel.id, name: hotel.name }; })) {
                          suggestions.push(sugg);
                        }

                        resolve();
                      },
                      (error) => {
                        reject(error);
                      }
                    );
                  }
                  );

                  await promise;

                  return suggestions;
                }
              },
              header: 'Create a Hotel offer',
              contentStyle: { overflow: 'auto' },
              baseZIndex: 10000,
              maximizable: false
            });
            break;

          case "Manage":
            this.ref = this.dialogService.open(ShowStaffHotelOffersComponent, {
              data: {
                offerName: 'Hotel',
                getOfferList: this.service.getHotelOffers(),
                editOffer: (offer: Offer) => this.service.editHotelOffer(offer),
                deleteOffer: (id: number) => this.service.deleteHotelOffer(id),

                productFilter: async (query: string) => {
                    const filter = new HotelFilter();
                    filter.hotelName = query;

                    let suggestions: { id: number, name: string }[] = [];

                    let promise = new Promise<void>((resolve, reject) => {
                      this.service.getHotelsWithFilter(filter).subscribe(
                        (hotels: Hotel[]) => {
                          for (let sugg of hotels.map(hotel => { return { id: hotel.id, name: hotel.name }; })) {
                            suggestions.push(sugg);
                          }

                          resolve();
                        },
                        (error) => {
                          reject(error);
                        }
                      );
                    }
                    );

                    await promise;

                    return suggestions;
                  }
              },
              contentStyle: { overflow: 'auto' },
              baseZIndex: 10000,
              width: '70%',
              maximizable: true
            });
            break;
        }

        break;
    }

  }
}

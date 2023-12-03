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
import { OfferFilter } from '../../models/offerFilter';
import { Document, ExportType } from '../../models/document';
import { Flight, FlightFilter } from '../../models/flight';
import { TourFilter } from '../../models/tourFilter';
import { Tour } from '../../models/tour';

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

  inputStartSales: Record<string, Date> = {};
  inputEndSales: Record<string, Date> = {};

  groups: { name: string, value: number }[] = [{ name: 'Day', value: GroupBy.Day }, { name: 'Month', value: GroupBy.Month }, { name: 'Year', value: GroupBy.Year }];
  selectedGroup: Record<string, { name: string, value: number }> = {};

  charts: { name: string, value: number }[] = [{ name: 'Sales', value: 1 }, { name: 'Offer sales', value: 2 }];
  selectedChart: Record<string, { name: string, value: number }> = {};

  //Sales
  dataSales: Record<string, any> = {};
  optionSales: Record<string, any> = {};

  groupSales: Record<string, string[]> = {};
  totalSales: Record<string, number[]> = {};
  moneySales: Record<string, number[]> = {};

  serviceSales: Record<string, Function> = {};
  serviceSalesDoc: Record<string, Function> = {};

  //Offer Sales
  dataOfferSales: Record<string, any> = {};
  optionOfferSales: Record<string, any> = {};

  groupOfferSales: Record<string, string[]> = {};
  descriptionOfferSales: Record<string, string[]> = {};
  totalOfferSales: Record<string, number[]> = {};
  moneyOfferSales: Record<string, number[]> = {};

  serviceOfferSales: Record<string, Function> = {};
  serviceOfferSalesDoc: Record<string, Function> = {};

  ngOnInit() {
    for (let model of this.OffersControlItems) {
      this.inputStartSales[model] = new Date();
      this.inputEndSales[model] = new Date();

      this.selectedGroup[model] = this.groups[0];
      this.selectedChart[model] = this.charts[0];

      //Sales
      this.groupSales[model] = [];
      this.totalSales[model] = [];
      this.moneySales[model] = [];

      //Offer Sales
      this.groupOfferSales[model] = [];
      this.descriptionOfferSales[model] = [];
      this.totalOfferSales[model] = [];
      this.moneyOfferSales[model] = [];

      const epdf = ExportType.PDF;

      switch (model) {
        case 'Hotel Offers':
          this.serviceSales[model] = (request: SaleRequest) => this.service.getHotelSales(request);
          this.serviceSalesDoc[model] = (request: SaleRequest, exportTo: string) => this.service.getHotelSales(request, exportTo);
          this.serviceOfferSales[model] = (request: SaleRequest) => this.service.getHotelOfferSales(request);
          this.serviceOfferSalesDoc[model] = (request: SaleRequest, exportTo: string) => this.service.getHotelOfferSales(request, exportTo);
          break;
        case 'Flight Offers':
          this.serviceSales[model] = (request: SaleRequest) => this.service.getFlightSales(request);
          this.serviceSalesDoc[model] = (request: SaleRequest, exportTo: string) => this.service.getFlightSales(request, exportTo);
          this.serviceOfferSales[model] = (request: SaleRequest) => this.service.getFlightOfferSales(request);
          this.serviceOfferSalesDoc[model] = (request: SaleRequest, exportTo: string) => this.service.getFlightOfferSales(request, exportTo);
          break;
        case 'Tour Offers':
          this.serviceSales[model] = (request: SaleRequest) => this.service.getTourSales(request);
          this.serviceSalesDoc[model] = (request: SaleRequest, exportTo: string) => this.service.getTourSales(request, exportTo);
          this.serviceOfferSales[model] = (request: SaleRequest) => this.service.getTourOfferSales(request);
          this.serviceOfferSalesDoc[model] = (request: SaleRequest, exportTo: string) => this.service.getTourOfferSales(request, exportTo);
          break;
        case 'Packages':
          this.serviceSales[model] = (request: SaleRequest) => this.service.getPackageSales(request);
          this.serviceSalesDoc[model] = (request: SaleRequest, exportTo: string) => this.service.getPackageSales(request, exportTo);
          this.serviceOfferSales[model] = (request: SaleRequest) => this.service.getPackageOfferSales(request);
          this.serviceOfferSalesDoc[model] = (request: SaleRequest, exportTo: string) => this.service.getPackageOfferSales(request, exportTo);
          break;
      }

      this.onChangeRequest(model);
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

    this.serviceOfferSales[model]({ start: this.inputStartSales[model], end: this.inputEndSales[model] })
      .subscribe((data: SaleResponse[]) => {
        this.groupOfferSales[model] = data.map(sale => sale.group);
        this.descriptionOfferSales[model] = data.map(sale => sale.description);
        this.totalOfferSales[model] = data.map(sale => sale.total);
        this.moneyOfferSales[model] = data.map(sale => sale.moneyAmount);
        this.refreshOfferSales(model);
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

  refreshOfferSales(model: string) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const footer = (tooltipItems: any) => {
      return 'Total: ' + this.totalOfferSales[model][tooltipItems[0].dataIndex] + '\n\n' + this.descriptionOfferSales[model][tooltipItems[0].dataIndex];
    };

    this.dataOfferSales[model] = {
      labels: this.groupOfferSales[model],
      datasets: [
        {
          label: 'Offer Sales',
          data: this.moneyOfferSales[model],
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          barThickness: this.groupOfferSales[model].length <= 5 ? 60 : 'flex'
        }
      ]
    };

    this.optionOfferSales[model] = {
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
            color: textColorSecondary,
            font: {
              weight: 500
            }
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
                filter: async (query: string, productId: number | undefined) => {
                  const filter = new HotelFilter();

                  if (productId)
                    filter.productId = productId;
                  else
                    filter.hotelName = query;

                  filter.pageIndex = 1;
                  filter.pageSize = 30;

                  let suggestions: { id: number, name: string }[] = [];

                  let promise = new Promise<void>((resolve, reject) => {
                    this.service.getHotels(filter).subscribe(
                      hotels => {
                        for (let sugg of hotels.items.map(hotel => { return { id: hotel.id, name: hotel.name + " - " + hotel.address.city }; })) {
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
                getOfferList: (filter: OfferFilter) => {
                  filter.agencyId = Number.parseInt(localStorage.getItem('agencyId')!);
                  return this.service.getOffersWithFilter(filter, 'hotel');
                },
                editOffer: (offer: Offer) => this.service.editHotelOffer(offer),
                deleteOffer: (id: number) => this.service.deleteHotelOffer(id),

                productFilter: async (query: string, productId: number | undefined) => {
                    const filter = new HotelFilter();

                    if (productId)
                      filter.productId = productId;
                    else
                      filter.hotelName = query;

                    filter.pageIndex = 1;
                    filter.pageSize = 30;

                    let suggestions: { id: number, name: string }[] = [];

                    let promise = new Promise<void>((resolve, reject) => {
                      this.service.getHotels(filter).subscribe(
                        hotels => {
                          for (let sugg of hotels.items.map(hotel => { return { id: hotel.id, name: hotel.name + ' - ' + hotel.address.city }; })) {
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
              width: '80%',
              maximizable: true
            });
            break;
        }

        break;

      case "Flight Offers":

        switch (action) {
          case "Create":
            const offer = new Offer();

            this.ref = this.dialogService.open(CreateEditOffersComponent, {
              data: {
                offer: offer,
                execute: (flightOffer: Offer) => this.service.createFlightOffer(flightOffer),
                filter: async (query: string, productId: number | undefined) => {
                  const filter = new FlightFilter();

                  if (productId)
                    filter.id = productId;
                  else
                    filter.flightNumber = +query ? +query : -1;

                  filter.pageIndex = 1;
                  filter.pageSize = 30;

                  let suggestions: { id: number, name: string }[] = [];

                  let promise = new Promise<void>((resolve, reject) => {
                    this.service.getFlights(filter).subscribe(
                      flights => {
                        for (let sugg of flights.items.map(flight => { return { id: flight.id, name: flight.flightNumber + " - " + flight.airline }; })) {
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
              header: 'Create a Flight offer',
              contentStyle: { overflow: 'auto' },
              baseZIndex: 10000,
              maximizable: false
            });
            break;

          case "Manage":
            
            this.ref = this.dialogService.open(ShowStaffHotelOffersComponent, {
              data: {
                offerName: 'Flight',
                getOfferList: (filter: OfferFilter) => {
                  filter.agencyId = Number.parseInt(localStorage.getItem('agencyId')!);
                  return this.service.getOffersWithFilter(filter, 'flight');
                },
                editOffer: (offer: Offer) => this.service.editFlightOffer(offer),
                deleteOffer: (id: number) => this.service.deleteFlightOffer(id),

                productFilter: async (query: string, productId: number | undefined) => {
                  const filter = new FlightFilter();

                  if (productId)
                    filter.id = productId;
                  else
                    filter.flightNumber = +query ? +query : -1;

                  filter.pageIndex = 1;
                  filter.pageSize = 30;

                  let suggestions: { id: number, name: string }[] = [];

                  let promise = new Promise<void>((resolve, reject) => {
                    this.service.getFlights(filter).subscribe(
                      flights => {
                        for (let sugg of flights.items.map(flight => { return { id: flight.id, name: flight.flightNumber + ' - ' + flight.airline }; })) {
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
              width: '80%',
              maximizable: true
            });
            break;
        }

        break;

      case "Tour Offers":

        switch (action) {
          case "Create":
            const offer = new Offer();

            this.ref = this.dialogService.open(CreateEditOffersComponent, {
              data: {
                offer: offer,
                execute: (tourOffer: Offer) => this.service.createTourOffer(tourOffer),
                filter: async (query: string, productId: number | undefined) => {
                  const filter = new TourFilter();

                  if (productId)
                    filter.id = productId;
                  else
                    filter.sourcePlace = query;

                  filter.pageIndex = 1;
                  filter.pageSize = 30;

                  let suggestions: { id: number, name: string }[] = [];

                  let promise = new Promise<void>((resolve, reject) => {
                    this.service.getTours(filter).subscribe(
                      tours => {
                        for (let sugg of tours.items.map(tour => { return { id: tour.id, name: tour.sourceInfo.place.city + " - " + tour.destinationInfo.place.city }; })) {
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
              header: 'Create a Tour offer',
              contentStyle: { overflow: 'auto' },
              baseZIndex: 10000,
              maximizable: false
            });
            break;

          case "Manage":
            const agencyFilter = new OfferFilter();
            agencyFilter.agencyId = Number.parseInt(localStorage.getItem('agencyId')!);

            this.ref = this.dialogService.open(ShowStaffHotelOffersComponent, {
              data: {
                offerName: 'Tour',
                getOfferList: (filter: OfferFilter) => {
                  filter.agencyId = Number.parseInt(localStorage.getItem('agencyId')!);
                  return this.service.getOffersWithFilter(filter, 'tour');
                },
                editOffer: (offer: Offer) => this.service.editTourOffer(offer),
                deleteOffer: (id: number) => this.service.deleteTourOffer(id),

                productFilter: async (query: string, productId: number | undefined) => {
                  const filter = new TourFilter();

                  if (productId)
                    filter.id = productId;
                  else
                    filter.sourcePlace = query;

                  filter.pageIndex = 1;
                  filter.pageSize = 30;

                  let suggestions: { id: number, name: string }[] = [];

                  let promise = new Promise<void>((resolve, reject) => {
                    this.service.getTours(filter).subscribe(
                      tours => {
                        for (let sugg of tours.items.map(tour => { return { id: tour.id, name: tour.sourceInfo.place.city + ' - ' + tour.destinationInfo.place.city }; })) {
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
              width: '80%',
              maximizable: true
            });
            break;
        }

        break;
    }

  }

  downloadDoc(model: string, exportTo: string) {
    switch (this.selectedChart[model].value)
    {
      case 1:
        this.serviceSalesDoc[model]({ start: this.inputStartSales[model], end: this.inputEndSales[model], groupBy: this.selectedGroup[model].value }, exportTo).subscribe(
          (doc: Document) => {
            const link = document.createElement('a');
            link.href = 'data:' + doc.contentType + ';base64,' + doc.contentBase64;
            link.download = doc.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        );
        break;

      case 2:
        this.serviceOfferSalesDoc[model]({ start: this.inputStartSales[model], end: this.inputEndSales[model] }, exportTo).subscribe(
          (doc: Document) => {
            const link = document.createElement('a');
            link.href = 'data:' + doc.contentType + ';base64,' + doc.contentBase64;
            link.download = doc.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }
        );
        break;
    }
  }
}

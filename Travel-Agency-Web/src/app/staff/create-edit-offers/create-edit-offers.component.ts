import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Offer } from '../../models/offer';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedService } from '../../shared.service';
import { FileUpload, FileUploadEvent, FileUploadHandlerEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { Tour } from '../../models/tour';
import { Package, PackageFacility } from '../../models/package';
import { TourFilter } from '../../models/tourFilter';
import { CreateEditHotelComponent } from '../create-edit-hotel/create-edit-hotel.component';
import { Hotel } from '../../models/hotel';
import { CreateEditTourComponent } from '../create-edit-tour/create-edit-tour.component';
import { Flight } from '../../models/flight';
import { CreateEditFlightComponent } from '../create-edit-flight/create-edit-flight.component';
import { ShowCalendarComponent } from '../../show-calendar/show-calendar.component';
import {isNullOrEmpty} from "../../common/common";

@Component({
  selector: 'app-create-edit-offers',
  templateUrl: './create-edit-offers.component.html',
  styleUrls: ['./create-edit-offers.component.css'],
  providers: [MessageService]
})
export class CreateEditOffersComponent {

  @ViewChild(FileUpload) fileUpload!: FileUpload;
  disableUpload: boolean = false;

  viewImage = false;
  editImage = false;

  selectedModel: { id: number, name: string } | undefined;
  suggestions: { id: number, name: string }[] = [];

  id: number = 0;
  inputTitle: string | undefined;
  inputPrice: number = 0;
  inputCapacity: number = 0;
  inputStartDate: string | undefined;
  inputEndDate: string | undefined;
  inputDescription: string | undefined;

  imageId: number | undefined;
  imageName: string | undefined;
  imagePath: string | undefined;

  errorLabel: string = '';

  sourceTours: Tour[] = [];
  targetTours: Tour[] = [];
  queryTour: string = '';

  sourcePFacilities: PackageFacility[] = [];
  targetPFacilities: PackageFacility[] = [];
  queryFacility: string = '';

  refaddProduct: DynamicDialogRef | undefined;
  refchangeDate: DynamicDialogRef | undefined;

  constructor(private service: SharedService, private dialogService: DialogService, public ref: DynamicDialogRef, public config: DynamicDialogConfig, private messageService: MessageService)
  {
    if (config.data['offer']) {
      const offer: Offer = config.data['offer'];

      this.editImage = true;

      this.id = offer.id;
      this.inputTitle = offer.title;
      this.inputPrice = offer.price;
      this.inputCapacity = offer.capacity;
      this.inputDescription = offer.description;

      if (offer.startDate) {
        this.inputStartDate = new Date(offer.startDate.toString()).toDateString();
      }
      if (offer.endDate) {
        this.inputEndDate = new Date(offer.endDate.toString()).toDateString();
      }

      if (offer.productId)
        this.setSelectedModel(offer.productId);

      if (offer.imageId)
        this.imageId = offer.imageId;

      if (this.config.data['offerName'] == 'Package') {
        this.service.getPackageTours(offer.id).subscribe(
          tours => {
            this.targetTours = tours;
            this.searchTours(this.queryTour);
          }
        );
        this.service.getPackageFacilities(offer.id).subscribe(
          pfs => {
            this.targetPFacilities = pfs;
            this.searchFacilities(this.queryFacility);
          }
        );
      }
    }

    else if (this.config.data['offerName'] == 'Package') {
      this.searchTours(this.queryTour);
    }
  }

  async setSelectedModel(productId: number) {
    this.suggestions = await this.config.data['filter']('', productId);

    this.selectedModel = this.suggestions[0];
  }

  async searchModel(event: any) {
    this.suggestions = await this.config.data['filter'](event.query);
  }

  async searchTours(query: string) {
    this.sourceTours = await this.config.data['filter'](query, this.targetTours);
  }

  async searchFacilities(query: string) {
    this.sourcePFacilities = await this.config.data['filterFacility'](query, this.targetPFacilities);
  }

  onOk() {
    const offer = new Offer();

    offer.id = this.id;
    offer.title = this.inputTitle;
    offer.capacity = this.inputCapacity!;
    offer.price = this.inputPrice;
    offer.description = this.inputDescription;

    if (this.inputStartDate)
      offer.startDate = new Date(this.inputStartDate);

    if (this.inputEndDate)
      offer.endDate = new Date(this.inputEndDate);

    if (this.imageId == undefined) {
      this.errorLabel = "Please select an image";
      return;
    }

    offer.imageId = this.imageId;

    if (this.config.data['offerName'] != 'Package') {
      if (this.selectedModel)
        offer.productId = this.selectedModel.id;
      else {
        this.errorLabel = "Please select a product";
        return;
      }

      if (isNullOrEmpty(this.inputTitle) || isNullOrEmpty(this.inputDescription) || !this.inputCapacity || !this.inputPrice || !this.inputStartDate || !this.inputEndDate) {
        this.errorLabel = "Please fill all fields";
        return;
      }

      this.config.data['execute'](offer).subscribe(
        () => { this.ref.close(true); },
        (error: any) => {
          if (error.error.errors) {
            let err = '';

            for (let errs of Object.values(error.error.errors)) {
              for (let e of <Array<string>>errs) {
                err += e + '\n';
              }
            }

            this.errorLabel = err;
          }
          else
            this.errorLabel = error.error;
        },
        () => { }
      );
    }
    else
    {
      if (!this.targetTours || this.targetTours.length == 0)
      {
        this.errorLabel = "Please select some tours";
        return;
      }

      const pack = new Package();

      pack.id = this.id;
      pack.title = this.inputTitle;
      pack.capacity = this.inputCapacity!;
      pack.price = this.inputPrice;
      pack.description = this.inputDescription;

      if (this.inputStartDate)
        pack.startDate = new Date(this.inputStartDate);

      if (this.inputEndDate)
        pack.endDate = new Date(this.inputEndDate);

      pack.imageId = this.imageId;

      pack.ToursIds = this.targetTours.map(tour => tour.id);

      for (let pf of this.targetPFacilities) {
        if (pf.price == undefined || pf.price < 0) {
          this.errorLabel = "Please enter a valid price in facilities";
          return;
        }
      }

      pack.FacilitiesIds = this.targetPFacilities.map(pf => pf.facility!.id!);
      pack.FacilitiesPrices = this.targetPFacilities.map(pf => pf.price!);

      this.config.data['execute'](pack).subscribe(
        () => { this.ref.close(true); },
        (error: any) => {
          if (error.error.errors) {
            let err = '';

            for (let errs of Object.values(error.error.errors)) {
              for (let e of <Array<string>>errs) {
                err += e + '\n';
              }
            }

            this.errorLabel = err;
          }
          else
            this.errorLabel = error.error;
        },
        () => { }
      );
    }

  }

  myUploader(event: FileUploadHandlerEvent) {
    this.disableUpload = true;
    this.viewImage = false;

    if (!this.editImage && this.imageId) {
      this.service.deleteImage(this.imageId).subscribe(
        () => {}
      );
    }

    this.imageId = undefined;

    this.service.uploadImage(event.files[0]).subscribe(
      id => {
        this.imageId = id;
        this.fileUpload.clear();
        this.disableUpload = false;
        this.editImage = false;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'There was an error uploading the image, please try again' });
        this.disableUpload = false;
        this.fileUpload.clear();
      }
    );
  }

  ViewImage() {
    this.service.getImage(this.imageId!).subscribe(
      file => {
        this.imageName = file.name;
        this.imagePath = file.filePath;
        this.viewImage = true;
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'There was an error showing the image, please try again' });
        this.imageName = undefined;
        this.imagePath = undefined;
      }
    );
  }

  getDurationString(days: number) {
    return days > 0 ? 'Duration: ' + days + ' Days' : 'Single Day';
  }

  addNewProduct() {
    switch (this.config.data['offerName']) {
      case 'Hotel':
        this.refaddProduct = this.dialogService.open(CreateEditHotelComponent, {
          data: {
            hotel: {},
            execute: (hotel: Hotel) => this.service.createHotel(hotel)
          },
          header: 'Create a new hotel',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: false
        });
        break;

      case 'Flight':
        this.ref = this.dialogService.open(CreateEditFlightComponent, {
          data: {
            flight: {} as Flight,
            execute: (flight: Flight) => this.service.createFlight(flight)
          },
          header: 'Create a new flight',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: false
        });
        break;

      case 'Tour':
        this.ref = this.dialogService.open(CreateEditTourComponent, {
          data: {
            tour: {} as Tour,
            execute: (tour: Tour) => this.service.createTour(tour)
          },
          header: 'Create a new tour',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: false
        });
        break;
    }
  }

  openCalendarDialog(field: string) {
    switch (field) {
      case 'StartDate':
        this.refchangeDate = this.dialogService.open(ShowCalendarComponent, {
          data: {
            date: this.inputStartDate ? new Date(this.inputStartDate) : undefined
          },
          header: 'Select a start date',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true
        });

        this.refchangeDate.onClose.subscribe((date: Date | undefined) => {
          if (date) {
            this.inputStartDate = date.toDateString();
          }
        })
        break;

      case 'EndDate':
        this.refchangeDate = this.dialogService.open(ShowCalendarComponent, {
          data: {
            date: this.inputEndDate ? new Date(this.inputEndDate) : undefined
          },
          header: 'Select an end date',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true
        });

        this.refchangeDate.onClose.subscribe((date: Date | undefined) => {
          if (date) {
            this.inputEndDate = date.toDateString();
          }
        })
        break;
    }
  }
}

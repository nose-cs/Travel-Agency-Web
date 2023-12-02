import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { Offer } from '../../models/offer';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedService } from '../../shared.service';
import { FileUpload, FileUploadEvent, FileUploadHandlerEvent } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';

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
  inputStartDate: Date | undefined;
  inputEndDate: Date | undefined;
  inputDescription: string | undefined;

  imageId: number | undefined;
  imageName: string | undefined;
  imagePath: string | undefined;

  errorLabel: string = '';

  constructor(private service: SharedService, public ref: DynamicDialogRef, public config: DynamicDialogConfig, private messageService: MessageService)
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
        this.inputStartDate = new Date(offer.startDate.toString());
      }
      if (offer.endDate) {
        this.inputEndDate = new Date(offer.endDate.toString());
      }

      if (offer.productId)
        this.setSelectedModel(offer.productId);

      if (offer.imageId)
        this.imageId = offer.imageId;
    }
  }

  async setSelectedModel(productId: number) {
    this.suggestions = await this.config.data['filter']('', productId);

    this.selectedModel = this.suggestions[0];
  }

  async searchModel(event: any) {
    this.suggestions = await this.config.data['filter'](event.query);
  }

  onOk() {
    const offer = new Offer();

    offer.id = this.id;
    offer.title = this.inputTitle;
    offer.capacity = this.inputCapacity!;
    offer.price = this.inputPrice;
    offer.description = this.inputDescription;
    offer.startDate = this.inputStartDate;
    offer.endDate = this.inputEndDate;
    offer.imageId = this.imageId;

    if (this.selectedModel)
      offer.productId = this.selectedModel.id;
    else {
      this.errorLabel = "Please select a product";
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
}

import {Component, ViewChild} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {SharedService} from '../../shared.service';
import {FileUpload, FileUploadHandlerEvent} from 'primeng/fileupload';
import {MessageService} from 'primeng/api';
import {Category, Hotel} from "../../models/hotel";
import {isNullOrEmpty} from "../../common/common";

@Component({
  selector: 'app-create-edit-hotel',
  templateUrl: './create-edit-hotel.component.html',
  styleUrls: ['./create-edit-hotel.component.css'],
  providers: [MessageService]
})
export class CreateEditHotelComponent {
  @ViewChild(FileUpload) fileUpload!: FileUpload;
  disableUpload: boolean = false;

  categories: Category[] | undefined;

  viewImage = false;
  editImage = false;

  id: number | undefined;
  inputName: string | undefined;
  inputAddress: string | undefined;
  inputCity: string | undefined;
  inputCountry: string | undefined;
  inputCategory: Category | undefined;

  imageId: number | undefined;
  imageName: string | undefined;
  imagePath: string | undefined;

  errorLabel: string = '';

  constructor(private service: SharedService, public ref: DynamicDialogRef, public config: DynamicDialogConfig,
              private messageService: MessageService) {
    this.categories = [Category.OneStar, Category.TwoStars, Category.ThreeStars, Category.FourStars, Category.FiveStars]

    if (config.data['hotel']) {
      const hotel: Hotel = config.data['hotel'];

      this.editImage = true;

      this.id = hotel.id;
      this.inputName = hotel.name;
      this.inputAddress = hotel.address?.address;
      this.inputCity = hotel.address?.city;
      this.inputCountry = hotel.address?.country;
      this.inputCategory = hotel.category;

      if (hotel.image && hotel.image.id)
        this.imageId = hotel.image.id;
    }
  }

  onOk() {
    if (isNullOrEmpty(this.inputName) || isNullOrEmpty(this.inputAddress) || isNullOrEmpty(this.inputCity) || isNullOrEmpty(this.inputCountry) || !this.inputCategory) {
      this.errorLabel = 'Please fill all the fields';
      return;
    }

    if (!this.imageId) {
      this.errorLabel = 'Image is required';
      return;
    }

    const hotel = {
      id: this.id,
      name: this.inputName,
      address: {
        address: this.inputAddress,
        city: this.inputCity,
        country: this.inputCountry
      },
      category: this.inputCategory,
      imageId: this.imageId
    }

    this.config.data['execute'](hotel).subscribe(
      () => {
        this.ref.close(true);
      },
      (error: any) => {
        if (error.error.errors) {
          let err = '';

          for (let errs of Object.values(error.error.errors)) {
            for (let e of <Array<string>>errs) {
              err += e + '\n';
            }
          }

          this.errorLabel = err;
        } else
          this.errorLabel = error.error;
      },
      () => {
      }
    );
  }

  myUploader(event: FileUploadHandlerEvent) {
    this.disableUpload = true;
    this.viewImage = false;

    if (!this.editImage && this.imageId) {
      this.service.deleteImage(this.imageId).subscribe(
        () => {
        }
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
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error uploading the image, please try again'
        });
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
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'There was an error showing the image, please try again'
        });
        this.imageName = undefined;
        this.imagePath = undefined;
      }
    );
  }
}

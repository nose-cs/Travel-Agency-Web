import {Component, ViewChild} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {SharedService} from '../../shared.service';
import {FileUpload, FileUploadHandlerEvent} from 'primeng/fileupload';
import {MessageService} from 'primeng/api';
import {Time} from "@angular/common";
import {Day, Tour} from "../../models/tour";

@Component({
  selector: 'app-create-edit-tour',
  templateUrl: './create-edit-tour.component.html',
  styleUrls: ['./create-edit-tour.component.css'],
  providers: [MessageService]
})
export class CreateEditTourComponent {
  @ViewChild(FileUpload) fileUpload!: FileUpload;
  disableUpload: boolean = false;

  viewImage = false;
  editImage = false;

  id: number | undefined;
  inputSourceAddress: string | undefined;
  inputSourceCity: string | undefined;
  inputSourceCountry: string | undefined;
  inputDestinationAddress: string | undefined;
  inputDestinationCity: string | undefined;
  inputDestinationCountry: string | undefined;
  inputDuration: number | undefined;
  inputSourceDay: { day: Day, name: string } | undefined;
  inputSourceTime: Time | undefined;
  inputDestinationDay: { day: Day, name: string } | undefined;
  inputDestinationTime: Time | undefined;

  imageId: number | undefined;
  imageName: string | undefined;
  imagePath: string | undefined;

  days: { day: Day, name: string }[] | undefined

  errorLabel: string = '';

  constructor(private service: SharedService, public ref: DynamicDialogRef, public config: DynamicDialogConfig,
              private messageService: MessageService) {

    this.days = [{day: Day.Sunday, name: 'Sunday'},
      {day: Day.Monday, name: 'Monday'},
      {day: Day.Tuesday, name: 'Tuesday'},
      {day: Day.Wednesday, name: 'Wednesday'},
      {day: Day.Thursday, name: 'Thursday'},
      {day: Day.Friday, name: 'Friday'},
      {day: Day.Saturday, name: 'Saturday'}]

    if (config.data['tour']) {
      const tour: Tour = config.data['tour'];

      this.editImage = true;

      this.id = tour.id;
      this.inputSourceAddress = tour.sourceInfo?.place?.address;
      this.inputSourceCity = tour.sourceInfo?.place?.city;
      this.inputSourceCountry = tour.sourceInfo?.place?.country;
      this.inputDestinationAddress = tour.destinationInfo?.place?.address;
      this.inputDestinationCity = tour.destinationInfo?.place?.city;
      this.inputDestinationCountry = tour.destinationInfo?.place?.country;
      this.inputDuration = tour.duration;
      this.inputSourceDay = this.getDayName(tour.sourceInfo?.day);
      this.inputSourceTime = tour.sourceInfo?.time;
      this.inputDestinationDay = this.getDayName(tour.destinationInfo?.day);
      this.inputDestinationTime = tour.destinationInfo?.time;

      if (tour.image && tour.image.id)
        this.imageId = tour.image.id;
    }
  }

  getDayName(day: Day) {
    return this.days?.find(x => x.day === day);
  }

  onOk() {
    const tour = {
      id: this.id,
      duration: this.inputDuration,
      sourceInfo: {
        place: {
          address: this.inputSourceAddress,
          city: this.inputSourceCity,
          country: this.inputSourceCountry
        },
        day: this.inputSourceDay?.day,
        time: this.inputSourceTime
      },
      destinationInfo: {
        place: {
          address: this.inputDestinationAddress,
          city: this.inputDestinationCity,
          country: this.inputDestinationCountry
        },
        day: this.inputDestinationDay?.day,
        time: this.inputDestinationTime
      },
      imageId: this.imageId
    } as Tour

    this.config.data['execute'](tour).subscribe(
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


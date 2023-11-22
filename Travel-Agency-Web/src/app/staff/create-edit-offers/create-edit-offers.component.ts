import { Component, EventEmitter, Output } from '@angular/core';
import { Offer } from '../../models/offer';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-create-edit-offers',
  templateUrl: './create-edit-offers.component.html',
  styleUrls: ['./create-edit-offers.component.css']
})
export class CreateEditOffersComponent {

  selectedModel: { id: number, name: string } | undefined;
  suggestions: { id: number, name: string }[] = [];

  id: number = 0;
  inputTitle: string | undefined;
  inputPrice: number = 0;
  inputCapacity: number = 0;
  inputStartDate: Date | undefined;
  inputEndDate: Date | undefined;
  inputDescription: string | undefined;

  errorLabel: string = '';

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig)
  {
    const offer : Offer = config.data['offer'];

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

    if (offer.productId && offer.productName)
      this.selectedModel = { id: offer.productId, name: offer.productName };
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
}

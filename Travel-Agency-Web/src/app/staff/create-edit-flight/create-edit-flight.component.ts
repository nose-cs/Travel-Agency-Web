import {Component} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {SharedService} from '../../shared.service';
import {MessageService} from 'primeng/api';
import {Flight} from "../../models/flight";

@Component({
  selector: 'app-create-edit-flight',
  templateUrl: './create-edit-flight.component.html',
  styleUrls: ['./create-edit-flight.component.css'],
  providers: [MessageService]
})
export class CreateEditFlightComponent {
  id: number | undefined;
  inputAirline: string | undefined;
  inputFlightNumber: number | undefined;
  inputSourceAddress: string | undefined;
  inputSourceCity: string | undefined;
  inputSourceCountry: string | undefined;
  inputDestinationAddress: string | undefined;
  inputDestinationCity: string | undefined;
  inputDestinationCountry: string | undefined;

  errorLabel: string = '';

  constructor(private service: SharedService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) {

    if (config.data['flight']) {
      const flight: Flight = config.data['flight'];

      this.id = flight.id;
      this.inputAirline = flight.airline;
      this.inputFlightNumber = flight.flightNumber
      this.inputSourceAddress = flight.sourcePlaceInfo?.address;
      this.inputSourceCity = flight.sourcePlaceInfo?.city;
      this.inputSourceCountry = flight.sourcePlaceInfo?.country;
      this.inputDestinationAddress = flight.destinationPlaceInfo?.address;
      this.inputDestinationCity = flight.destinationPlaceInfo?.city;
      this.inputDestinationCountry = flight.destinationPlaceInfo?.country;
    }
  }

  onOk() {
    const flight = {
      id: this.id,
      airline: this.inputAirline,
      flightNumber: this.inputFlightNumber,
      sourcePlaceInfo: {
        address: this.inputSourceAddress,
        city: this.inputSourceCity,
        country: this.inputSourceCountry
      },
      destinationPlaceInfo: {
        address: this.inputDestinationAddress,
        city: this.inputDestinationCity,
        country: this.inputDestinationCountry
      }
    } as Flight;

    this.config.data['execute'](flight).subscribe(
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
}

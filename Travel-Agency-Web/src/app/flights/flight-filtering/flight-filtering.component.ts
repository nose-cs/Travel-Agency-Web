import { Component, Output, EventEmitter  } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { HotelFilter } from 'src/app/models/hotelFilter';
import { Hotel } from 'src/app/models/hotel';
import { Flight, FlightFilter } from 'src/app/models/flight';

@Component({
  selector: 'app-flight-filtering',
  templateUrl: './flight-filtering.component.html',
  styleUrls: ['./flight-filtering.component.css']
})
export class FlightFilteringComponent {
  flNumber!: number;
  source!: string;
  destination!: string;
  airline! : string;
  constructor(private http: HttpClient, private service: SharedService) {}
  
  // Usa un evento para enviar los resultados del filtro al componente padre
  @Output() filterResults = new EventEmitter<Flight[]>();


onSubmit() {
  const filter = new FlightFilter();
  filter.flightNumber = this.flNumber;
  filter.sourcePlace = this.source;
  filter.destinationPlace = this.destination
  filter.airline = this.airline;
  console.log(filter.flightNumber)
  // Llama al servicio con el filtro y emite el evento con los resultados
  console.log(filter.flightNumber)

  this.service.getFlights(filter).subscribe(data => {
    this.filterResults.emit(data);
  });
}
}

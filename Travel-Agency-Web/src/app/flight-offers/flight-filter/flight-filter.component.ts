import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HotelFilter } from 'src/app/models/filterMapper';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-flight-filter',
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.css']
})
export class FlightFilterComponent implements OnInit {

  // Usa un evento para enviar los resultados del filtro al componente padre
  @Output() filterResults = new EventEmitter<any[]>();

  constructor(private service: SharedService) { }

  ngOnInit(): void {
  }

  onSubmit(filter: HotelFilter) {
    // Llama al servicio con el filtro y emite el evento con los resultados
    this.service.getFlightOffers(filter).subscribe(data => {
      this.filterResults.emit(data);
    });
  }
}

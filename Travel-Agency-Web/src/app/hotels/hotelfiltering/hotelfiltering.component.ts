import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HotelFilter } from 'src/app/models/hotelFilter'; 
import { SharedService } from 'src/app/shared.service';
import { Hotel } from '../../models/hotel';

@Component({
  selector: 'app-hotelfiltering',
  templateUrl: './hotelfiltering.component.html',
  styleUrls: ['./hotelfiltering.component.css']
})
export class HotelfilteringComponent {
  name!: string;
  address!: string;
  category!: string;

  constructor(private http: HttpClient, private service: SharedService) {}
  
  // Usa un evento para enviar los resultados del filtro al componente padre
  @Output() filterResults = new EventEmitter<Hotel[]>();


onSubmit(filter: HotelFilter) {
  // Llama al servicio con el filtro y emite el evento con los resultados
  this.service.getHotelsWithFilter(filter).subscribe(data => {
    this.filterResults.emit(data);
  });
}

}

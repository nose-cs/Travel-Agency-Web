import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { hotelFilter } from 'src/app/models/hotelFilter'; 
import { SharedService } from 'src/app/shared.service';

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
   @Output() filterResults = new EventEmitter<any[]>();


onSubmit(filter: hotelFilter) {
  // Llama al servicio con el filtro y emite el evento con los resultados
  this.service.getHotelsWithFilter(filter).subscribe(data => {
    this.filterResults.emit(data);
  });
}

}

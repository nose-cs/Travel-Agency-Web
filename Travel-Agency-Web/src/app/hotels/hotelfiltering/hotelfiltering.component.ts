import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  category!: number;

  constructor(private http: HttpClient, private service: SharedService) {}
  
  // Usa un evento para enviar los resultados del filtro al componente padre
  @Output() filter = new EventEmitter<HotelFilter>();


  onSubmit() {
    const filter = new HotelFilter();
    filter.hotelName = this.name;
    filter.address = this.address;
    filter.Category = this.category;

    this.filter.emit(filter);
  }
}

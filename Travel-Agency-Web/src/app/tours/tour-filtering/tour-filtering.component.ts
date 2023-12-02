import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import { HttpClient } from '@angular/common/http';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Tour } from 'src/app/models/tour';
import { TourFilter } from 'src/app/models/tourFilter';
import { Time } from '@angular/common';
import { Day } from 'src/app/models/tour';

@Component({
  selector: 'app-tour-filtering',
  templateUrl: './tour-filtering.component.html',
  styleUrls: ['./tour-filtering.component.css']
})
export class TourFilteringComponent {
  startTime!: Time;
  endTime!: Time;
  startDay!: {day: Day; name:string }
  source!: string;
  destination!: string;
  duration! : number;

  constructor(private http: HttpClient, private service: SharedService) {}
  days = [{day: Day.Sunday, name: 'Sunday'},
           {day: Day.Monday, name: 'Monday'},
           {day: Day.Tuesday, name: 'Tuesday'},
           {day: Day.Wednesday, name: 'Wednesday'},
           {day: Day.Thursday, name: 'Thursday'},
           {day: Day.Friday, name: 'Friday'},
           {day: Day.Saturday, name: 'Saturday'} ]
  
  // Usa un evento para enviar los resultados del filtro al componente padre
  @Output() filterResults = new EventEmitter<Tour[]>();


onSubmit() {
  const filter = new TourFilter()
  filter.startTime = this.startTime;
  filter.sourcePlace = this.source;
  filter.destinationPlace = this.destination
  filter.duration = this.duration;
  if(this.startDay) filter.startDay = this.startDay.day
  // Llama al servicio con el filtro y emite el evento con los resultados

  this.service.getTours(filter).subscribe(data => {
    this.filterResults.emit(data);
  });
}
}

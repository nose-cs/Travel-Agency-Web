import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-show-calendar',
  templateUrl: './show-calendar.component.html',
  styleUrls: ['./show-calendar.component.css']
})
export class ShowCalendarComponent {

  date: Date | undefined;

  constructor(private ref: DynamicDialogRef, private config: DynamicDialogConfig) { }

  ngOnInit() {
    this.date = this.config.data['date'];
  }

  Select() {
    this.ref.close(this.date);
  }

}

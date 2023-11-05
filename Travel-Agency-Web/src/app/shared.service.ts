import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = 'https://localhost:7160/api';
  readonly PhotoUrl = '';
  constructor(private http: HttpClient) { }

  getHotelOffers(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Show/getHotelOffers');
  }
}

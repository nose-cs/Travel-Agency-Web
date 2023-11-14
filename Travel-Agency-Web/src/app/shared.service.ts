import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './models/login';
import { Register } from './models/register';
import { JwtAuth } from './models/jwtAuth';
import { Offer } from './models/offer';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = 'https://localhost:3571/api';
  readonly PhotoUrl = '';
  constructor(private http: HttpClient) { }

  getHotelOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.APIUrl + '/HotelOffer');
  }
  getFlightOffers(): Observable<Offer[]> {
    return this.http.get<any>(this.APIUrl + '/FlightOffer');
  }
  

  register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.APIUrl + '/Identity/signup', user);
  }

  login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.APIUrl + '/Identity/login', user);
  }
}

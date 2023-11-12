import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './models/login';
import { Register } from './models/register';
import { JwtAuth } from './models/jwtAuth';
import { Offer } from './models/offer';
import { HotelFilter } from './models/filterMapper';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = 'http://localhost:5000/api';
  readonly PhotoUrl = '';
  constructor(private http: HttpClient) { }

  getHotelOffers(filter : HotelFilter): Observable<Offer[]> {
      // Construye los parámetros de la consulta a partir del filtro
      let params = new HttpParams();
      if (filter.productId) {
        params = params.append('productId', filter.productId.toString());
      }
      if (filter.startDate) {
        params = params.append('startDate', filter.startDate.toISOString());
      }
      if (filter.startPrice) {
        params = params.append('startPrice', filter.startPrice.toString());
      }
      if (filter.endPrice) {
        params = params.append('endPrice', filter.endPrice.toString());
      }
      if (filter.agencyId) {
        params = params.append('agencyId', filter.agencyId.toString());
      }
      if (filter.hotelName) {
        params = params.append('hotelName', filter.hotelName.toString());
      }
      // Hace la petición al backend con los parámetros
    return this.http.get<any>(this.APIUrl + '/Show/getHotelOffers', {params});
  }
  postHotelOffers(offer: Offer){
    this.http.post(this.APIUrl + '/Post/createHotelOffer', offer)
  }

   getFlightOffers(filter : HotelFilter): Observable<Offer[]> {
    // Construye los parámetros de la consulta a partir del filtro
    let params = new HttpParams();
    if (filter.productId) {
      params = params.append('productId', filter.productId.toString());
    }
    if (filter.startDate) {
      params = params.append('startDate', filter.startDate.toISOString());
    }
    if (filter.startPrice) {
      params = params.append('startPrice', filter.startPrice.toString());
    }
    if (filter.endPrice) {
      params = params.append('endPrice', filter.endPrice.toString());
    }
    if (filter.agencyId) {
      params = params.append('agencyId', filter.agencyId.toString());
    }
    if (filter.hotelName) {
      params = params.append('hotelName', filter.hotelName);
    }
    // Hace la petición al backend con los parámetros
  return this.http.get<any>(this.APIUrl + '/Show/getFlightOffers', {params});
}
  getTourOffers(): Observable<Offer[]> {
    return this.http.get<any>(this.APIUrl + '/Show/getTourOffers');
  }
  
  register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.APIUrl + '/Identity/signup', user);
  }

  login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.APIUrl + '/Identity/login', user);
  }
}

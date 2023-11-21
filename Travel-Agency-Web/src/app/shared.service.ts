import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './models/login';
import { Register } from './models/register';
import { JwtAuth } from './models/jwtAuth';
import { Offer } from './models/offer';
import { Hotel } from './models/hotel';
import { Params } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { HotelFilter } from './models/hotelFilter';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = 'http://localhost:5000/api';
  readonly PhotoUrl = '';
  constructor(private http: HttpClient) { }

  getHotelOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.APIUrl + '/HotelOffer');
  }
  getHotelOffer(id: number): Observable<Offer> {
    return this.http.get<Offer>(this.APIUrl + '/HotelOffer/' + id);
  }
  deleteHotelOffer(id: number): Observable<void> {
    return this.http.delete<void>(this.APIUrl + '/HotelOffer/' + id);
  }

  getFlightOffers(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.APIUrl + '/FlightOffer');
  }
  getHotels():Observable<Hotel[]>{
    return this.http.get<Hotel[]>(this.APIUrl + '/Hotel')
  }
  getHotelsWithFilter(filter : HotelFilter) {
    let params = new HttpParams();
      if (filter.productId) {
        params = params.append('productId', filter.productId.toString());
      }
      if(filter.hotelName){
        params = params.append('name', filter.hotelName.toString() )
      }
      if (filter.address) {
        params = params.append('address', filter.address.toString());
      }
      if(filter.Category){
        params = params.append('category', filter.Category.toString())
      }
    return this.http.get<Hotel[]>(this.APIUrl + '/Hotel/Get', {params});
  }

  createHotelOffer(offer: Offer): Observable<void> {
    return this.http.post<void>(this.APIUrl + '/HotelOffer', offer);
  }

  editHotelOffer(offer: Offer): Observable<void> {
    return this.http.put<void>(this.APIUrl + '/HotelOffer', offer);
  }

  register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.APIUrl + '/Identity/signup', user);
  }
  
  getIdHotelOffers(id: number): Observable<Offer[]>{ 
    return this.http.get<Offer[]>(this.APIUrl + '/HotelOffer/' + id  + '/offers'); 
  }

  login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.APIUrl + '/Identity/login', user);
  }
}

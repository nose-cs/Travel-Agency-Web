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
import { OfferFilter } from './models/offerFilter';
import { SaleRequest, SaleResponse } from './models/salesStatistics';
import { Flight } from './models/flight';

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
  getFlights(): Observable<Flight[]>{
    return this.http.get<Flight[]>(this.APIUrl + '/Flight')
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
  getHotelOffersWithFilter(filter : OfferFilter) {
    let params = new HttpParams();

    if(filter.productId)
      params = params.append('productId', filter.productId.toString());
    if (filter.capacity) {
      params = params.append('capacity', filter.capacity.toString());
    }
    if(filter.startPrice){
      params = params.append('startPrice', filter.startPrice.toString());
    }
    if(filter.endPrice){
      params = params.append('endPrice', filter.endPrice.toString());
    }
    if(filter.startDate){
      params = params.append('startDate', filter.startDate.toString());
    }
    if(filter.endDate){
      params = params.append('endDate', filter.endDate.toString());
    }
    return this.http.get<Offer[]>(this.APIUrl + '/HotelOffer/GetHotelsWithFilter', {params} )
}

  createHotelOffer(offer: Offer): Observable<void> {
    return this.http.post<void>(this.APIUrl + '/HotelOffer', offer);
  }

  editHotelOffer(offer: Offer): Observable<void> {
    return this.http.put<void>(this.APIUrl + '/HotelOffer', offer);
  }

  getHotelSales(request: SaleRequest): Observable<SaleResponse[]> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    if (request.groupBy)
      params = params.append('groupBy', request.groupBy.toString());

    return this.http.get<SaleResponse[]>(this.APIUrl + '/HotelReservation/getSales', { params });
  }

  getHotelOfferSales(request: SaleRequest): Observable<SaleResponse[]> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    return this.http.get<SaleResponse[]>(this.APIUrl + '/HotelOffer/getSales', { params });
  }

  getFlightSales(request: SaleRequest): Observable<SaleResponse[]> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    if (request.groupBy)
      params = params.append('groupBy', request.groupBy.toString());

    return this.http.get<SaleResponse[]>(this.APIUrl + '/FlightReservation/getSales', { params });
  }

  getFlightOfferSales(request: SaleRequest): Observable<SaleResponse[]> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    return this.http.get<SaleResponse[]>(this.APIUrl + '/FlightOffer/getSales', { params });
  }

  getTourSales(request: SaleRequest): Observable<SaleResponse[]> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    if (request.groupBy)
      params = params.append('groupBy', request.groupBy.toString());

    return this.http.get<SaleResponse[]>(this.APIUrl + '/TourReservation/getSales', { params });
  }

  getTourOfferSales(request: SaleRequest): Observable<SaleResponse[]> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    return this.http.get<SaleResponse[]>(this.APIUrl + '/TourOffer/getSales', { params });
  }

  getPackageSales(request: SaleRequest): Observable<SaleResponse[]> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    if (request.groupBy)
      params = params.append('groupBy', request.groupBy.toString());

    return this.http.get<SaleResponse[]>(this.APIUrl + '/PackageReservation/getSales', { params });
  }

  getPackageOfferSales(request: SaleRequest): Observable<SaleResponse[]> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    return this.http.get<SaleResponse[]>(this.APIUrl + '/PackageOffer/getSales', { params });
  }

  register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.APIUrl + '/Identity/register', user);
  }
  
  getIdHotelOffers(id: number): Observable<Offer[]>{ 
    return this.http.get<Offer[]>(this.APIUrl + '/Hotel/' + id  + '/offers'); 
  }

  login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.APIUrl + '/Identity/login', user);
  }
}

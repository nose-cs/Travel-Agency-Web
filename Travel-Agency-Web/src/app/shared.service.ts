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
import { Flight, FlightFilter } from './models/flight';
import { Tour } from './models/tour';
import { TourFilter } from './models/tourFilter';


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
  getTours():Observable<Tour[]>{
    return this.http.get<Tour[]>(this.APIUrl + '/Tour')
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

  getFlightsWithFilter(filter: FlightFilter){
    let params = new HttpParams();
    console.log(filter.flightNumber)
    if(filter.flightNumber) params = params.append('flightNumber', filter.flightNumber.toString())
    if(filter.DestinationPlace) params = params.append('destination', filter.DestinationPlace.toString())
    if(filter.SourcePlace) params = params.append('source', filter.SourcePlace.toString())
    if(filter.airline) params = params.append('airline', filter.airline.toString())
    return this.http.get<Flight[]>(this.APIUrl + '/Flight/Get', {params});
  }
  getToursWithFilter(filter: TourFilter){
    let params = new HttpParams();
    if(filter.destinationPlace) params = params.append('destination', filter.destinationPlace)
    if(filter.sourcePlace) params = params.append('source', filter.sourcePlace)
    if(filter.duration) params = params.append('duration', filter.duration.toString())
    if(filter.startTime) params = params.append( 'startTime', filter.startTime.toString())
    if(filter.endTime) params = params.append( 'endTime', filter.endTime.toString())
    if(filter.startDay) params = params.append( 'startDay', filter.startDay.toString())
    if(filter.id) params = params.append('id', filter.id.toString())
    return this.http.get<Tour[]>(this.APIUrl + '/Tour/Get', {params})
  }

  getOffersWithFilter(filter : OfferFilter, offerType: string) {
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
    console.log(offerType);
    if(offerType == 'hotel')
    return this.http.get<Offer[]>(this.APIUrl + '/HotelOffer/GetHotelsWithFilter', {params} );
    if(offerType == 'flight')
    return this.http.get<Offer[]>(this.APIUrl + '/FlightOffer/GetFlightsWithFilter', {params} );
    if(offerType == 'tour')
    return this.http.get<Offer[]>(this.APIUrl + '/TourOffer/GetToursWithFilter', {params} );
  return
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
  getIdFlightOffers(id: number): Observable<Offer[]>{ 
    return this.http.get<Offer[]>(this.APIUrl + '/Flight/' + id  + '/offers'); 
  }
  getIdTourOffers(id: number): Observable<Offer[]>{ 
    return this.http.get<Offer[]>(this.APIUrl + '/Tour/' + id  + '/offers'); 
  }

  login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.APIUrl + '/Identity/login', user);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from './models/login';
import { Register } from './models/register';
import { JwtAuth } from './models/jwtAuth';
import { Offer } from './models/offer';
import { Hotel } from './models/hotel';
import { HotelFilter } from './models/hotelFilter';
import { OfferFilter } from './models/offerFilter';
import { SaleRequest, SaleResponse } from './models/salesStatistics';
import { Document, ExportType } from './models/document';
import { Flight, FlightFilter } from './models/flight';
import { Tour } from './models/tour';
import { TourFilter } from './models/tourFilter';
import { AgencyUser } from "./models/agencyUser";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = 'http://localhost:5235/api';
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
    return this.getHotelsWithFilter({} as HotelFilter);
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
    return this.http.get<Hotel[]>(this.APIUrl + '/Hotel', {params});
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

    if (filter.productId) {
      params = params.append('productId', filter.productId.toString());
    }
    if (filter.agencyId) {
      params = params.append('agencyId', filter.agencyId.toString());
    }
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

    if(offerType == 'hotel')
      return this.http.get<Offer[]>(this.APIUrl + '/HotelOffer', {params} );
    if(offerType == 'flight')
      return this.http.get<Offer[]>(this.APIUrl + '/FlightOffer', {params} );
    if(offerType == 'tour')
      return this.http.get<Offer[]>(this.APIUrl + '/TourOffer', {params} );

    return;
  }

  createHotelOffer(offer: Offer): Observable<void> {
    return this.http.post<void>(this.APIUrl + '/HotelOffer', offer);
  }

  editHotelOffer(offer: Offer): Observable<void> {
    return this.http.put<void>(this.APIUrl + '/HotelOffer', offer);
  }
  

  getHotelSales(request: SaleRequest, exportTo?: string): Observable<SaleResponse[] | Document> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    if (request.groupBy)
      params = params.append('groupBy', request.groupBy.toString());

    if (exportTo)
      params = params.append('export', exportTo);

    return this.http.get<SaleResponse[] | Document>(this.APIUrl + '/HotelReservation/getSales', { params });
  }

  getHotelOfferSales(request: SaleRequest, exportTo?: string): Observable<SaleResponse[] | Document> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    if (exportTo)
      params = params.append('export', exportTo);

    return this.http.get<SaleResponse[] | Document>(this.APIUrl + '/HotelOffer/getSales', { params });
  }

  getHotelMostSolds(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.APIUrl + '/Hotel/getMostSolds');
  }

  getFlightSales(request: SaleRequest, exportTo?: string): Observable<SaleResponse[] | Document> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    if (request.groupBy)
      params = params.append('groupBy', request.groupBy.toString());

    if (exportTo)
      params = params.append('export', exportTo);

    return this.http.get<SaleResponse[]>(this.APIUrl + '/FlightReservation/getSales', { params });
  }

  getFlightOfferSales(request: SaleRequest, exportTo?: string): Observable<SaleResponse[] | Document> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    if (exportTo)
      params = params.append('export', exportTo);

    return this.http.get<SaleResponse[] | Document>(this.APIUrl + '/FlightOffer/getSales', { params });
  }

  getFlightMostSolds(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.APIUrl + '/Flight/getMostSolds');
  }

  getTourSales(request: SaleRequest, exportTo?: string): Observable<SaleResponse[] | Document> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    if (request.groupBy)
      params = params.append('groupBy', request.groupBy.toString());

    if (exportTo)
      params = params.append('export', exportTo);

    return this.http.get<SaleResponse[] | Document>(this.APIUrl + '/TourReservation/getSales', { params });
  }

  //getTourMostSolds(): Observable<Flight[]> {
  //  return this.http.get<Tour[]>(this.APIUrl + '/Tour/getMostSolds');
  //}

  getTourOfferSales(request: SaleRequest, exportTo?: string): Observable<SaleResponse[] | Document> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    if (exportTo)
      params = params.append('export', exportTo);

    return this.http.get<SaleResponse[] | Document>(this.APIUrl + '/TourOffer/getSales', { params });
  }

  getPackageSales(request: SaleRequest, exportTo?: string): Observable<SaleResponse[] | Document> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    if (request.groupBy)
      params = params.append('groupBy', request.groupBy.toString());

    if (exportTo)
      params = params.append('export', exportTo);

    return this.http.get<SaleResponse[] | Document>(this.APIUrl + '/PackageReservation/getSales', { params });
  }

  getPackageOfferSales(request: SaleRequest, exportTo?: string): Observable<SaleResponse[] | Document> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    if (exportTo)
      params = params.append('export', exportTo);

    return this.http.get<SaleResponse[] | Document>(this.APIUrl + '/PackageOffer/getSales', { params });
  }

  getPackageMostSolds(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.APIUrl + '/PackageOffer/getMostSolds');
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

  uploadImage(file: File): Observable<number> {
    let formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<number>(this.APIUrl + '/File', formData);
  }

  deleteImage(id: number): Observable<any> {
    return this.http.delete<any>(this.APIUrl + '/File/' + id);
  }

  getImage(id: number): Observable<import('./models/file').File> {
    return this.http.get<import('./models/file').File>(this.APIUrl + '/File/' + id);
  }


  getAgencyUsers(id: number): Observable<AgencyUser[]>{
    return this.http.get<AgencyUser[]>(this.APIUrl + '/Agency/' + id + '/employees');
  }

  createAgencyUser(agencyUser: AgencyUser, agencyId: number): Observable<void> {
    return this.http.post<void>(this.APIUrl + `/Agency/${agencyId}/register`, agencyUser);
  }

  editAgencyUser(agencyUser: AgencyUser, agencyId: number): Observable<void> {
    return this.http.put<void>(this.APIUrl + `/Agency/${agencyId}/employees/${agencyUser.id}`, agencyUser);
  }

  deleteAgencyUser(agencyId: number, userId: number) : Observable<void> {
    return this.http.delete<void>(this.APIUrl + `/Agency/${agencyId}/employees/${userId}`);
  }
}

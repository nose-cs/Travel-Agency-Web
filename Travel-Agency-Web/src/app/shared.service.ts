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
import { Document } from './models/document';
import { Flight, FlightFilter } from './models/flight';
import { Tour } from './models/tour';
import { TourFilter } from './models/tourFilter';
import {AgencyUser} from "./models/agencyUser";
import {Agency} from "./models/agency";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = 'http://localhost:5235/api';
  constructor(private http: HttpClient) { }

  // Hotel CRUD
  getHotels(filter : HotelFilter) {
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

  createHotel(hotel: Hotel): Observable<void> {
    return this.http.post<void>(this.APIUrl + '/Hotel', hotel);
  }

  editHotel(hotel: Hotel, hotelId: number): Observable<void> {
    return this.http.put<void>(this.APIUrl + `/Hotel/${hotelId}`, hotel);
  }

  deleteHotel(hotelId: number) : Observable<void> {
    return this.http.delete<void>(this.APIUrl + `/Hotel/${hotelId}`);
  }

  // Flight CRUD
  getFlights(filter: FlightFilter){
    let params = new HttpParams();
    if (filter.id) params = params.append('id', filter.id.toString())
    if(filter.flightNumber) params = params.append('flightNumber', filter.flightNumber.toString())
    if(filter.destinationPlace) params = params.append('destination', filter.destinationPlace.toString())
    if(filter.sourcePlace) params = params.append('source', filter.sourcePlace.toString())
    if(filter.airline) params = params.append('airline', filter.airline.toString())
    return this.http.get<Flight[]>(this.APIUrl + '/Flight', {params});
  }

  createFlight(flight: Flight): Observable<void> {
    const f = {
      source: flight.sourcePlaceInfo,
      destination: flight.destinationPlaceInfo,
      flightNumber: flight.flightNumber,
      airline: flight.airline
    }
    return this.http.post<void>(this.APIUrl + '/Flight', f);
  }

  editFlight(flight: Flight, flightId: number): Observable<void> {
    return this.http.put<void>(this.APIUrl + `/Flight/${flightId}`, flight);
  }

  deleteFlight(flightId: number) : Observable<void> {
    return this.http.delete<void>(this.APIUrl + `/Flight/${flightId}`);
  }

  //Tour CRUD
  getTours(filter: TourFilter){
    let params = new HttpParams();
    if(filter.destinationPlace) params = params.append('destination', filter.destinationPlace)
    if(filter.sourcePlace) params = params.append('source', filter.sourcePlace)
    if(filter.duration) params = params.append('duration', filter.duration.toString())
    if(filter.startTime) params = params.append( 'startTime', filter.startTime.toString())
    if(filter.endTime) params = params.append( 'endTime', filter.endTime.toString())
    if(filter.startDay) params = params.append( 'startDay', filter.startDay.toString())
    if(filter.id) params = params.append('id', filter.id.toString())
    return this.http.get<Tour[]>(this.APIUrl + '/Tour', {params})
  }

  createTour(tour: Tour): Observable<void> {
    return this.http.post<void>(this.APIUrl + '/Tour', tour);
  }

  editTour(tour: Tour, tourId: number): Observable<void> {
    return this.http.put<void>(this.APIUrl + `/Tour/${tourId}`, tour);
  }

  deleteTour(tourId: number) : Observable<void> {
    return this.http.delete<void>(this.APIUrl + `/Tour/${tourId}`);
  }

  //Offers with Filter
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
    if(offerType == 'package')
    return this.http.get<Offer[]>(this.APIUrl + '/Package', {params} );
    return;
  }

  //Hotel Offer CRUD
  createHotelOffer(offer: Offer): Observable<void> {
    return this.http.post<void>(this.APIUrl + '/HotelOffer', offer);
  }

  editHotelOffer(offer: Offer): Observable<void> {
    return this.http.put<void>(this.APIUrl + '/HotelOffer', offer);
  }

  deleteHotelOffer(id: number): Observable<void> {
    return this.http.delete<void>(this.APIUrl + '/HotelOffer/' + id);
  }

  //Flight Offer CRUD
  createFlightOffer(offer: Offer): Observable<void> {
    return this.http.post<void>(this.APIUrl + '/FlightOffer', offer);
  }

  editFlightOffer(offer: Offer): Observable<void> {
    return this.http.put<void>(this.APIUrl + '/FlightOffer', offer);
  }

  deleteFlightOffer(id: number): Observable<void> {
    return this.http.delete<void>(this.APIUrl + '/FlightOffer/' + id);
  }

  //Tour Offer CRUD
  createTourOffer(offer: Offer): Observable<void> {
    return this.http.post<void>(this.APIUrl + '/TourOffer', offer);
  }

  editTourOffer(offer: Offer): Observable<void> {
    return this.http.put<void>(this.APIUrl + '/TourOffer', offer);
  }

  deleteTourOffer(id: number): Observable<void> {
    return this.http.delete<void>(this.APIUrl + '/TourOffer/' + id);
  }


  //Hotel Statistics
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


   //Flight Statistics
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


   //Tour Statistics
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

  getTourOfferSales(request: SaleRequest, exportTo?: string): Observable<SaleResponse[] | Document> {
    let params = new HttpParams();
    params = params.append('start', request.start.toDateString());
    params = params.append('end', request.end.toDateString());

    if (exportTo)
      params = params.append('export', exportTo);

    return this.http.get<SaleResponse[] | Document>(this.APIUrl + '/TourOffer/getSales', { params });
  }

  getTourMostSolds(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.APIUrl + '/Tour/getMostSolds');
  }


   //Package Statistics
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

    return this.http.get<SaleResponse[] | Document>(this.APIUrl + '/Package/getSales', { params });
  }

  getPackageMostSolds(): Observable<Offer[]> {
    return this.http.get<Offer[]>(this.APIUrl + '/Package/getMostSolds');
  }


  //Offers by Id
  getIdHotelOffers(id: number): Observable<Offer[]>{
    return this.http.get<Offer[]>(this.APIUrl + '/Hotel/' + id  + '/offers');
  }
  getIdFlightOffers(id: number): Observable<Offer[]>{
    return this.http.get<Offer[]>(this.APIUrl + '/Flight/' + id  + '/offers');
  }
  getIdTourOffers(id: number): Observable<Offer[]>{
    return this.http.get<Offer[]>(this.APIUrl + '/Tour/' + id  + '/offers');
  }


  // identity
  login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.APIUrl + '/Identity/login', user);
  }

  register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.APIUrl + '/Identity/register', user);
  }


  //Image CRUD
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



  //Agency User CRUD
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

  getAllAgencyUsers(): Observable<AgencyUser[]>{
    return this.http.get<AgencyUser[]>(this.APIUrl + '/Admin/AgenciesUsers');
  }


  // Agency CRUD
  getAgency() : Observable<Agency[]> {
    return this.http.get<Agency[]>(this.APIUrl + `/Agency`);
  }

  createAgency(agency: Agency): Observable<void> {
    return this.http.post<void>(this.APIUrl + '/Agency', agency);
  }

  editAgency(agency: Agency, agencyId: number): Observable<void> {
    return this.http.put<void>(this.APIUrl + `/Agency/${agencyId}`, agency);
  }

  deleteAgency(agencyId: number) : Observable<void> {
    return this.http.delete<void>(this.APIUrl + `/Agency/${agencyId}`);
  }
}

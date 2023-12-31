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
import { Reservation, ReservationFilter } from './models/reservation';
import { TourFilter } from './models/tourFilter';
import { AgencyUser } from "./models/agencyUser";
import { ChangePasswordRequest } from './models/changePasswordRequest';
import { PaginationResponse } from './models/PaginationResponse';
import { Facility, FacilityFilter, Package, PackageFacility } from './models/package';
import {Agency} from "./models/agency";
import { Pagination } from './models/pagination';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = 'https://localhost:3571/api';
  constructor(private http: HttpClient) { }

  // Hotel CRUD
  getHotels(filter : HotelFilter) {
    let params = new HttpParams();
      if (filter.productId) {
        params = params.append('productId', filter.productId.toString());
      }
      if(filter.hotelName){
        params = params.append('name', filter.hotelName.toString());
      }
      if (filter.address) {
        params = params.append('address', filter.address.toString());
      }
      if(filter.Category){
        params = params.append('category', filter.Category.toString());
      }
      if (filter.pageIndex) {
        params = params.append('pageIndex', filter.pageIndex);
      }
      if (filter.pageSize) {
        params = params.append('pageSize', filter.pageSize);
      }
      if (filter.orderBy) {
        params = params.append('orderBy', filter.orderBy);
      }
      if (filter.descending) {
        params = params.append('descending', filter.descending);
      }

      return this.http.get<PaginationResponse<Hotel>>(this.APIUrl + '/Hotel', {params});
  }

  getPackageHotels(id: number){
    return this.http.get<Hotel[]>(this.APIUrl + '/Hotel/' + id + '/fromPackage')
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
    if (filter.airline) params = params.append('airline', filter.airline.toString())

    if (filter.pageIndex) {
      params = params.append('pageIndex', filter.pageIndex);
    }
    if (filter.pageSize) {
      params = params.append('pageSize', filter.pageSize);
    }
    if (filter.orderBy) {
      params = params.append('orderBy', filter.orderBy);
    }
    if (filter.descending) {
      params = params.append('descending', filter.descending);
    }

    return this.http.get<PaginationResponse<Flight>>(this.APIUrl + '/Flight', {params});
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
    if (filter.id) params = params.append('id', filter.id.toString())

    if (filter.pageIndex) {
      params = params.append('pageIndex', filter.pageIndex);
    }
    if (filter.pageSize) {
      params = params.append('pageSize', filter.pageSize);
    }
    if (filter.orderBy) {
      params = params.append('orderBy', filter.orderBy);
    }
    if (filter.descending) {
      params = params.append('descending', filter.descending);
    }

    return this.http.get<PaginationResponse<Tour>>(this.APIUrl + '/Tour', {params})
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
  getPackageTours(packageId: number) {
    let params = new HttpParams();
    params = params.append('packageId', packageId);

    return this.http.get<Tour[]>(this.APIUrl + '/Package/getTours', { params })
  }

  getTourHotels(TourId: number){
    return this.http.get<Hotel[]>(this.APIUrl + '/Hotel/' + TourId + '/fromTour');
  }

  getPackageFacilities(packageId: number) {
    let params = new HttpParams();
    params = params.append('packageId', packageId);

    return this.http.get<PackageFacility[]>(this.APIUrl + '/Package/getPackageFacilities', { params })
  }

  getFacilities(filter: FacilityFilter) {
    let params = new HttpParams();

    if (filter.id)
      params = params.append('id', filter.id);
    if (filter.name)
      params = params.append('name', filter.name);
    if (filter.description)
      params = params.append('description', filter.description);

    if (filter.pageIndex) {
      params = params.append('pageIndex', filter.pageIndex);
    }
    if (filter.pageSize) {
      params = params.append('pageSize', filter.pageSize);
    }
    if (filter.orderBy) {
      params = params.append('orderBy', filter.orderBy);
    }
    if (filter.descending) {
      params = params.append('descending', filter.descending);
    }

    return this.http.get<PaginationResponse<Facility>>(this.APIUrl + '/Facility', { params })
  }

  //Offers with Filter
  getOffersWithFilter(filter: OfferFilter, offerType: string): Observable<PaginationResponse<Offer>> {
    let params = new HttpParams();

    if (filter.title) {
      params = params.append('title', filter.title);
    }
    if (filter.productId) {
      params = params.append('productId', filter.productId.toString());
    }
    if (filter.title){
      params = params.append('title', filter.title.toString());
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
    if (filter.pageIndex) {
      params = params.append('pageIndex', filter.pageIndex);
    }
    if (filter.pageSize) {
      params = params.append('pageSize', filter.pageSize);
    }
    if (filter.orderBy) {
      params = params.append('orderBy', filter.orderBy);
    }
    if (filter.descending) {
      params = params.append('descending', filter.descending);
    }
    if (filter.validToday) {
      params = params.append('validToday', filter.validToday);
    }

    if(offerType == 'hotel')
      return this.http.get<PaginationResponse<Offer>>(this.APIUrl + '/HotelOffer', {params} );
    if(offerType == 'flight')
      return this.http.get<PaginationResponse<Offer>>(this.APIUrl + '/FlightOffer', {params} );
    if(offerType == 'tour')
      return this.http.get<PaginationResponse<Offer>>(this.APIUrl + '/TourOffer', {params} );
    if (offerType == 'package')
      return this.http.get<PaginationResponse<Package>>(this.APIUrl + '/Package', { params });

    throw new Error("Offer Type not valid");
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

  //Package CRUD
  createPackage(pack: Package): Observable<void> {
    return this.http.post<void>(this.APIUrl + '/Package', pack);
  }

  editPackage(pack: Package): Observable<void> {
    return this.http.put<void>(this.APIUrl + '/Package', pack);
  }

  deletePackage(id: number): Observable<void> {
    return this.http.delete<void>(this.APIUrl + '/Package/' + id);
  }


  //Reservation CRUD
  getReservations(filter: ReservationFilter, product: string): Observable<PaginationResponse<Reservation>>
  {
    let params = new HttpParams();

    if (filter.pageIndex) {
      params = params.append('pageIndex', filter.pageIndex);
    }
    if (filter.pageSize) {
      params = params.append('pageSize', filter.pageSize);
    }
    if (filter.orderBy) {
      params = params.append('orderBy', filter.orderBy);
    }
    if (filter.descending) {
      params = params.append('descending', filter.descending);
    }
    if (filter.current) {
      params = params.append('current', filter.current);
    }

    switch (product) {
      case 'Hotel':
        return this.http.get<PaginationResponse<Reservation>>(this.APIUrl + '/HotelReservation', { params });
      case 'Flight':
        return this.http.get<PaginationResponse<Reservation>>(this.APIUrl + '/FlightReservation', { params });
      case 'Tour':
        return this.http.get<PaginationResponse<Reservation>>(this.APIUrl + '/TourReservation', { params });
      case 'Package':
        return this.http.get<PaginationResponse<Reservation>>(this.APIUrl + '/PackageReservation', { params });
    }

    throw new Error("Product not supported");
  }

  createReservation(reservation: Reservation, product: string) {

    switch (product) {
      case 'hotel':
        return this.http.post<void>(this.APIUrl + '/HotelReservation', reservation);
      case 'flight':
        return this.http.post<void>(this.APIUrl + '/FlightReservation', reservation);
      case 'tour':
        return this.http.post<void>(this.APIUrl + '/TourReservation', reservation);
      case 'package':
        return this.http.post<void>(this.APIUrl + '/PackageReservation', reservation);
    }

    throw new Error("Product not supported");
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


  // identity
  login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.APIUrl + '/Identity/login', user);
  }

  register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.APIUrl + '/Identity/register', user);
  }

  changePassword(changeRequest: ChangePasswordRequest): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.APIUrl + '/Identity/changePassword', changeRequest);
  }

  getTouristsTravelCountry(country: string, exportTo: string): Observable<Document>
  {
    let params = new HttpParams();
    params = params.append('country', country);
    params = params.append('export', exportTo);

    return this.http.get<Document>(this.APIUrl + '/Identity/getTouristsTravelCountry', {params});
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
  getAgencyUsers(id: number, filter: Pagination): Observable<PaginationResponse<AgencyUser>>{
    let params = new HttpParams();

    if (filter.pageIndex) {
      params = params.append('pageIndex', filter.pageIndex);
    }
    if (filter.pageSize) {
      params = params.append('pageSize', filter.pageSize);
    }
    if (filter.orderBy) {
      params = params.append('orderBy', filter.orderBy);
    }
    if (filter.descending) {
      params = params.append('descending', filter.descending);
    }

    return this.http.get<PaginationResponse<AgencyUser>>(this.APIUrl + '/Agency/' + id + '/employees', {params});
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

  getAllAgencyUsers(filter: Pagination): Observable<PaginationResponse<AgencyUser>>{
    let params = new HttpParams();

    if (filter.pageIndex) {
      params = params.append('pageIndex', filter.pageIndex);
    }
    if (filter.pageSize) {
      params = params.append('pageSize', filter.pageSize);
    }
    if (filter.orderBy) {
      params = params.append('orderBy', filter.orderBy);
    }
    if (filter.descending) {
      params = params.append('descending', filter.descending);
    }

    return this.http.get<PaginationResponse<AgencyUser>>(this.APIUrl + '/Admin/AgenciesUsers', {params});
  }


  // Agency CRUD
  getAgencies(filter: Pagination): Observable<PaginationResponse<Agency>> {
    let params = new HttpParams();

    if (filter.pageIndex) {
      params = params.append('pageIndex', filter.pageIndex);
    }
    if (filter.pageSize) {
      params = params.append('pageSize', filter.pageSize);
    }
    if (filter.orderBy) {
      params = params.append('orderBy', filter.orderBy);
    }
    if (filter.descending) {
      params = params.append('descending', filter.descending);
    }

    return this.http.get<PaginationResponse<Agency>>(this.APIUrl + '/Agency', {params});
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HotelOffersComponent } from './hotel-offers/hotel-offers.component';
import { ShowHotelOffersComponent } from './hotel-offers/show-hotel-offers/show-hotel-offers.component';
import { SharedService } from './shared.service';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationInterceptor } from './interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { CarouselModule } from 'primeng/carousel';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { PaginatorModule } from 'primeng/paginator';
import { PickListModule } from 'primeng/picklist';

import { HotelsComponent } from './hotels/hotels.component';
import { ShowHotelsComponent } from './hotels/show-hotels/show-hotels.component';
import { SplitterModule } from 'primeng/splitter';
import { HotelfilteringComponent } from './hotels/hotelfiltering/hotelfiltering.component';
import { CreateEditOffersComponent } from './staff/create-edit-offers/create-edit-offers.component';
import { StaffSiteComponent } from './staff-site/staff-site.component';
import { MarketingComponent } from './staff-site/marketing/marketing.component';

import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HomeComponent } from './home/home.component';

import { OfferFilterComponent } from './offer-filter/offer-filter.component';
import { ShowStaffHotelOffersComponent } from './staff/show-staff-offers/show-staff-offers.component';
import { AgencyAdminComponent } from './staff-site/agency-admin/agency-admin.component';
import { CreateEditUserComponent } from './staff/create-edit-user/create-edit-user.component';
import { ShowAgencyUsersComponent } from './staff/show-agency-users/show-agency-users.component';
import { FlightsComponent } from './flights/flights.component';
import { FlightFilteringComponent } from './flights/flight-filtering/flight-filtering.component';
import { ToursComponent } from './tours/tours.component';
import { TourFilteringComponent } from './tours/tour-filtering/tour-filtering.component';
import { PackagesComponent } from './packages/packages.component';
import { PackageDetailsComponent } from './packages/package-details/package-details.component';
import { MessageService } from 'primeng/api';
import { UserSiteComponent } from './user-site/user-site.component';
import { TourHotelsComponent } from './tours/tour-hotels/tour-hotels.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HotelOffersComponent,
    ShowHotelOffersComponent,
    HotelsComponent,
    ShowHotelsComponent,
    HotelfilteringComponent,
    CreateEditOffersComponent,
    StaffSiteComponent,
    MarketingComponent,
    ShowStaffHotelOffersComponent,
    OfferFilterComponent,
    FlightsComponent,
    FlightFilteringComponent,
    ToursComponent,
    TourFilteringComponent,
    AgencyAdminComponent,
    CreateEditUserComponent,
    ShowAgencyUsersComponent,
    PackagesComponent,
    PackageDetailsComponent,
    UserSiteComponent,
    TourHotelsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    DataViewModule,
    ButtonModule,
    MenubarModule,
    DialogModule,
    PasswordModule,
    InputTextModule,
    TabMenuModule,
    SplitterModule,
    CardModule,
    DynamicDialogModule,
    AutoCompleteModule,
    CalendarModule,
    InputNumberModule,
    InputTextareaModule,
    TableModule,
    ConfirmDialogModule,
    ChartModule,
    DropdownModule,
    CarouselModule,
    FileUploadModule,
    ToastModule,
    FieldsetModule,
    CheckboxModule,
    RadioButtonModule,
    TabViewModule,
    PaginatorModule,
    PickListModule
  ],
  providers: [SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    DialogService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

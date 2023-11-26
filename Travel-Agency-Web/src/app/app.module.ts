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
import { FlightOffersComponent } from './flight-offers/flight-offers.component';
import { ShowFlightOffersComponent } from './flight-offers/show-flight-offers/show-flight-offers.component';
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
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { HomeComponent } from './home/home.component';

import { OfferFilterComponent } from './offer-filter/offer-filter.component';
import { ShowStaffHotelOffersComponent } from './staff/show-staff-offers/show-staff-offers.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HotelOffersComponent,
    ShowHotelOffersComponent,
    FlightOffersComponent,
    ShowFlightOffersComponent,
    HotelsComponent,
    ShowHotelsComponent,
    HotelfilteringComponent,
    CreateEditOffersComponent,
    StaffSiteComponent,
    MarketingComponent,
    ShowStaffHotelOffersComponent,
    OfferFilterComponent
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
    DropdownModule
  ],
  providers: [SharedService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

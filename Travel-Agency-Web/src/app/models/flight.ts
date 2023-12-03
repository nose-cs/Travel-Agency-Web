import { Place } from "./hotel";

export interface Flight{
    id: number;
    sourcePlaceInfo: Place
    destinationPlaceInfo: Place
    flightNumber: number
    airline: string
}

export class FlightFilter{
    id: number | undefined;
    sourcePlace: string | undefined;
    destinationPlace: string | undefined;
    flightNumber: number | undefined;
  airline: string | undefined;

  pageIndex: number | undefined;
  pageSize: number | undefined;

  orderBy: string | undefined;
  descending: boolean | undefined;
}

import { Place } from "./hotel";

export interface Flight{
    id: number;
    sourcePlaceInfo: Place
    destinationPlaceInfo: Place
    flightNumber: number
    airline: string
}

export class FlightFilter{
    SourcePlace: string|null = null
    DestinationPlace: string|null = null
    flightNumber: number|null = null
    airline:string|null = null
}
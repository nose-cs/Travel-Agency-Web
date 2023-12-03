import { Place } from "./hotel";
import { Pagination } from "./pagination";

export interface Flight{
    id: number;
    sourcePlaceInfo: Place
    destinationPlaceInfo: Place
    flightNumber: number
    airline: string
}

export class FlightFilter extends Pagination
{
    id: number | undefined;
    sourcePlace: string | undefined;
    destinationPlace: string | undefined;
    flightNumber: number | undefined;
    airline: string | undefined;
}

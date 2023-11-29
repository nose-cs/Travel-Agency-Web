import { Place } from "./hotel";

export interface Flight{
    id: number;
    source: Place
    destination: Place
    flightNumber: number
    airline: string
}
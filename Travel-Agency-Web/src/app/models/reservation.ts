import { Pagination } from "./pagination";

export class Reservation{
  id = 0;
  price = 0;
  departureDate: Date | undefined;
  arrivalDate: Date | undefined;
  numberofTravellers = 0;
  offerId = 0;
  touristId = 0;
  creditCard: string | undefined;
}

export class ReservationFilter extends Pagination
{
  current: boolean | undefined;
}

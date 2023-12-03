export class Reservation
{
    id = 0;
    price = 0;
    departureDate: Date | undefined;
    arrivalDate: Date | undefined;
    numberofTravellers = 0;
    offerId = 0;
    offerTitle: string | undefined;
    touristId = 0;
    paymentFormat = "Cash";
    creditCard: string | undefined;
}
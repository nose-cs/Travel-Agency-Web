export interface OfferFilter{

    startDate: Date;
    endDate: Date
    capacity: number;
    startPrice: number;
    endPrice: number;
    productId: number | undefined;
}
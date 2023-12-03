import { Pagination } from "./pagination";

export class HotelFilter extends Pagination
{
    productId: number | null = null;
    address: string | null = null;
    hotelName: string | null = null;
    Category?: number | null;
}


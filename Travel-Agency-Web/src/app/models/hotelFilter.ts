export class HotelFilter
{
    productId: number | null = null;
    address: string | null = null;
    hotelName: string | null = null;
  Category?: number | null;

  pageIndex: number | undefined;
  pageSize: number | undefined;

  orderBy: string | undefined;
  descending: boolean | undefined;
}


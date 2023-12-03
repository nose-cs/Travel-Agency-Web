export class OfferFilter{
  title: string | undefined;
  productId: number | undefined;
  agencyId: number | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  capacity: number | undefined;
  startPrice: number | undefined;
  endPrice: number | undefined;

  pageIndex: number | undefined;
  pageSize: number | undefined;

  orderBy: string | undefined;
  descending: boolean | undefined;
}

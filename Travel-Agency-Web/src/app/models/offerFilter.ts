import { Pagination } from "./pagination";

export class OfferFilter extends Pagination
{
  title: string | undefined;
  productId: number | undefined;
  agencyId: number | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
  capacity: number | undefined;
  startPrice: number | undefined;
  endPrice: number | undefined;

  validToday: boolean | undefined;
}

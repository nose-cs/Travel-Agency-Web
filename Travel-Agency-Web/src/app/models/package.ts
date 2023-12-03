import { Offer } from "./offer";

export class Package extends Offer
{
  ToursIds: number[] = [];
  FacilitiesIds: number[] = [];
  FacilitiesPrices: number[] = [];
}

export class PackageFacility
{
  price: number | undefined;
  packageId: number | undefined;
  facility: Facility | undefined;
}

export class Facility
{
  id: number | undefined;
  name: string = '';
  description: string = '';
}

export class FacilityFilter {
  id: number | undefined;
  name: string | undefined;
  description: string | undefined;

  pageIndex: number | undefined;
  pageSize: number | undefined;

  orderBy: string | undefined;
  descending: boolean | undefined;
}

export enum GroupBy
{
  Day,
  Month,
  Year
}

export class SaleRequest {
  start: Date = new Date();
  end: Date = new Date();
  groupBy: GroupBy | undefined;
}
export class SaleResponse {
  group = '';
  description = '';
  total = 0;
  moneyAmount = 0.0;
}

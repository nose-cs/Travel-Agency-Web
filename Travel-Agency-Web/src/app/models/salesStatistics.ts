export enum GroupBy
{
  Day,
  Month,
  Year
}

export class SaleRequest {
  start: Date = new Date();
  end: Date = new Date();
  groupBy: GroupBy = GroupBy.Day;
}
export class SaleResponse {
  group = '';
  total = 0;
  moneyAmount = 0.0;
}

import { Time } from "@angular/common"
import { Day } from "./tour"
                                                                                                                                                     
export class TourFilter{
   id: number| undefined 
   duration: number| undefined
   startDay:Day|undefined
   sourcePlace: string|undefined
   destinationPlace: string|undefined
   startTime: Time|undefined
  endTime: Time | undefined

  pageIndex: number | undefined;
  pageSize: number | undefined;

  orderBy: string | undefined;
  descending: boolean | undefined;
}

import { Time } from "@angular/common"
import { Day } from "./tour"
import { Pagination } from "./pagination"

export class TourFilter extends Pagination
{
   id: number| undefined 
   duration: number| undefined
   startDay:Day|undefined
   sourcePlace: string|undefined
   destinationPlace: string|undefined
   startTime: Time|undefined
  endTime: Time | undefined
}

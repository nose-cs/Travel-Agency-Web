import { DayTemplateContext } from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-day-template-context";
import { Place } from "./hotel";
export interface Tour{
    Duration: number
    StartDay: string
    StartTime: string
    EndTime: string
    Source: Place
    Destination:Place

}
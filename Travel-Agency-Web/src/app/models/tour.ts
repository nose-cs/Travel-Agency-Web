import { DayTemplateContext } from "@ng-bootstrap/ng-bootstrap/datepicker/datepicker-day-template-context";
import { Place } from "./hotel";
import { Time } from "@angular/common";
export interface Tour{
    id: number
    duration: number
    sourceInfo: TourInfo
    destinationInfo: TourInfo

}

export interface TourInfo{
    place: Place
    day: Day
    time: Time
}

export enum Day{
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}

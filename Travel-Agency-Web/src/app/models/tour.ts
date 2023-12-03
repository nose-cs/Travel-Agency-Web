import {Place} from "./hotel";
import {File} from "./file";

export interface Tour {
  id: number
  duration: number
  sourceInfo: TourInfo
  destinationInfo: TourInfo
  imageId: number;
  image: File;
}

export interface TourInfo {
  place: Place
  day: Day
  time: Date
}

export enum Day {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}

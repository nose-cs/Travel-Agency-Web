import {File} from "./file";

export interface Hotel {
    id: number;
    name: string;
    address: Place;
    category: Category;
    imageId: number;
    image: File;
}

export enum Category {
  OneStar = 1,
  TwoStars = 2,
  ThreeStars = 3,
  FourStars = 4,
  FiveStars = 5
}
export interface Place {
  address: string,
  city: string,
  country: string
}

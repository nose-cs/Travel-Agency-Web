export interface Hotel {
    id: number;
    name: string;
    place: Place;
    category: Category;
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
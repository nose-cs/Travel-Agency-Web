import {Place} from "./hotel";

export interface Agency {
  id: number;
  name : string;
  fax: string;
  email: string;
  address: Place
}

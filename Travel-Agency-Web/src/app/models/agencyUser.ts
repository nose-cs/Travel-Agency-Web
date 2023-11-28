export enum Role
{
  Tourist = 0,
  Agent = 1,
  MarketingEmployee = 2,
  AgencyAdmin = 3,
  TravellerAdmin = 4
}

export interface AgencyUser {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role.AgencyAdmin | Role.Agent | Role.MarketingEmployee;
    agencyId: number;
}

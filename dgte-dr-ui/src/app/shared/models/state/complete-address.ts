import { Duration } from '@los/shared/models';

export class CompleteAddress {
  permanent: Address;
  present: Address;
  periodOfStay: Duration;
}

export class Address {
  homeNumber: number;
  streetNumber: number;
  streetName: string;
  cityName: string;
  province: string;
  zipCode: number;
  houseOwnership?: string;
}

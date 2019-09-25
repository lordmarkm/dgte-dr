export * from './apartment.service';
export * from './lease.service';

import { ApartmentService } from './apartment.service';
import { LeaseService } from './lease.service';

export const RentServices = [
  ApartmentService,
  LeaseService
]

export * from './project.service';
export * from './apartment.service';
export * from './lease.service';
export * from './rent-payment.service';

import { ProjectService } from './project.service';
import { ApartmentService } from './apartment.service';
import { LeaseService } from './lease.service';
import { RentPaymentService } from './rent-payment.service';

export const Services = [
  ProjectService,
  ApartmentService,
  LeaseService,
  RentPaymentService,
]

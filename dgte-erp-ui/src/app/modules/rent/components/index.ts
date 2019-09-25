import { RentComponent } from '../rent.component';
import { ApartmentDetailsComponent } from './apartment-details/apartment-details.component';
import { RoomsComponent } from './rooms/rooms.component';
import { LeaseSummaryComponent } from './rooms/lease-summary.component';
import { AddRoomModalComponent } from './add-room-modal/add-room-modal.component';

export const Components = [
  RentComponent,
  ApartmentDetailsComponent,
  RoomsComponent,
  LeaseSummaryComponent,

  //modals
  AddRoomModalComponent
];

export const EntryComponents = [
  AddRoomModalComponent
];

export {
  RentComponent,
  ApartmentDetailsComponent,
  RoomsComponent,
  LeaseSummaryComponent,

  //modals
  AddRoomModalComponent
};

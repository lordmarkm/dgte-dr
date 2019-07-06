import { AdminComponent } from '../admin.component';
// layout
import { HeaderComponent } from './layout/header/header.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { FooterComponent } from './layout/footer/footer.component';
// pages
import { EndorsementsComponent } from './loans/list/endorsements.component';
import { LoanDetailsComponent } from './loans/loan-details/loan-details.component';
import { AdminLoginComponent } from "./login-page/admin-login.component";
import { AdminChangePasswordComponent } from "./admin-change-password/admin-change-password.component";
import { UserInfoComponent } from "./user-info/user-info.component";
import { CompanyComponent } from "@los/modules/admin/components/company/company.component";
import { CompanyDetailsComponent } from "@los/modules/admin/components/company/company-details/company-details.component";
// modals
import { AttachmentsModalComponent } from './loans/loan-details/attachments-modal/attachments-modal.component';
import { UpdateLoanStatusModalComponent  } from './loans/update-loan-status-modal/update-loan-status-modal.component';
import { AddNoteModalComponent } from './loans/add-note-modal/add-note-modal.component';

export const Components = [
  AdminComponent,
  AdminLoginComponent,
  AdminChangePasswordComponent,
  EndorsementsComponent,
  LoanDetailsComponent,
  HeaderComponent,
  SidenavComponent,
  FooterComponent,
  UserInfoComponent,
  AttachmentsModalComponent,
  UpdateLoanStatusModalComponent,
  AddNoteModalComponent,
  CompanyComponent,
  CompanyDetailsComponent
];

export const EntryComponents = [
  AttachmentsModalComponent,
  UpdateLoanStatusModalComponent,
  AddNoteModalComponent
];

export {
  AdminComponent,
  AdminLoginComponent,
  AdminChangePasswordComponent,
  EndorsementsComponent,
  LoanDetailsComponent,
  HeaderComponent,
  SidenavComponent,
  FooterComponent,
  UserInfoComponent,
  AttachmentsModalComponent,
  UpdateLoanStatusModalComponent,
  AddNoteModalComponent,
  CompanyComponent,
  CompanyDetailsComponent
};

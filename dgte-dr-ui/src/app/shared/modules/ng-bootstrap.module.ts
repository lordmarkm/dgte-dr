import { NgModule } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from './ngb-date-fr-parser-formatter';


// uncomment as needed
import {
  // NgbAccordion,
  // NgbAlertModule,
  NgbButtonsModule,
  // NgbCarouselModule,
  // NgbCollapseModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbModalModule,
  // NgbPaginationModule,
  // NgbPopoverModule,
  // NgbProgressbarModule,
  // NgbRatingModule,
  NgbTabsetModule,
  // NgbTimepickerModule,
  // NgbTooltipModule,
  // NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    // NgbAccordion,
    // NgbAlertModule,
    NgbButtonsModule,
    // NgbCarouselModule,
    // NgbCollapseModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbModalModule,
    // NgbPaginationModule,
    // NgbPopoverModule,
    // NgbProgressbarModule,
    // NgbRatingModule,
    NgbTabsetModule,
    // NgbTimepickerModule,
    // NgbTooltipModule,
    // NgbTypeaheadModule
  ],
  exports: [
    // NgbAccordion,
    // NgbAlertModule,
    NgbButtonsModule,
    // NgbCarouselModule,
    // NgbCollapseModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbModalModule,
    // NgbPaginationModule,
    // NgbPopoverModule,
    // NgbProgressbarModule,
    // NgbRatingModule,
    NgbTabsetModule,
    // NgbTimepickerModule,
    // NgbTooltipModule,
    // NgbTypeaheadModule
  ],
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class NgBootstrapModule { }

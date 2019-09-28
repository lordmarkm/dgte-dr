import { Component, Input, OnInit} from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';
import { LoansService } from '@los/core/services';

@Component({
  selector: 'dgte-erp-select-date-range-modal',
  templateUrl: './select-date-range-modal.component.html',
  styleUrls: ['./select-date-range-modal.component.scss']
})
export class SelectDateRangeModalComponent implements OnInit {
  @Input() startDate;
  @Input() endDate;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

}

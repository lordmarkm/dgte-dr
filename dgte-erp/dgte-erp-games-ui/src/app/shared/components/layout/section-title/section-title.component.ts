import {Component, EventEmitter, Input, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'los-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.scss']
})
export class SectionTitleComponent {
  @Input() title;
  @Input() readonly;
  @Input() dateApplied;
  @Input() action;

  @Output() goToStep = new EventEmitter();
  @Output() triggerAction = new EventEmitter();


  // inject ElementRef so that we can access nativeElement property
  constructor(public elementRef: ElementRef) {}

  wizardGoToStep() {
    this.goToStep.next();
  }

  onTriggerAction() {
    this.triggerAction.emit();
  }

}

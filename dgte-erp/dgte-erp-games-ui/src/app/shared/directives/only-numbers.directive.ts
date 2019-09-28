import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[OnlyNumbers]'
})
export class OnlyNumbersDirective {

  constructor(private el: ElementRef) { }

  @Input() OnlyNumbers: boolean;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    const e: KeyboardEvent = event;
    if (this.OnlyNumbers) {
      if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      }
    }
  }
}

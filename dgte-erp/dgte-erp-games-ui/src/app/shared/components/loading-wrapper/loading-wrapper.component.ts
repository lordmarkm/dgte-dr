import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'los-loading-wrapper',
  templateUrl: './loading-wrapper.component.html',
  styleUrls: ['./loading-wrapper.component.scss']
})
export class LoadingWrapperComponent implements OnInit {
  @Input() isLoading: false;
  @Input() fullScreen: false;
  @Input() message: string;

  constructor() {}

  ngOnInit() {}

}

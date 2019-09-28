import { Component, Input } from '@angular/core';
import { Company } from '@los/shared/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() company: Company;
  @Input() iconUrl: string;
}

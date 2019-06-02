import { Component, Input, OnInit} from '@angular/core';

import { Person } from '@los/shared/models';

@Component({
  selector: 'featured-person',
  templateUrl: './featured-person.component.html'
})
export class FeaturedPersonComponent implements OnInit {
  @Input() public person: Person;

  constructor() {}

  ngOnInit() {
      console.log(this.person);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from '@los/core/services';

@Component({
  selector: 'dgtedr-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  public isLoading = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private personService: PersonService) { }

  ngOnInit() {
      this.personService.getPeople({}).subscribe(r => r);
  }

}

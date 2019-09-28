import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonService } from '@los/core/services';
import { Person } from '@los/shared/models';

@Component({
  selector: 'dgtedr-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  public isLoading = false;
  public people: Person[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private personService: PersonService) { }

  ngOnInit() {
      this.personService.getPeople({}).subscribe(r => {
          this.people = r.content;
      });
  }

}

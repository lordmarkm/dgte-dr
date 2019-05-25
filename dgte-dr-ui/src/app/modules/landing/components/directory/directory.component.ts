import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dgtedr-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.scss']
})
export class DirectoryComponent implements OnInit {
  public isLoading = false;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';

@Component({
  selector: 'main-side-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {}
}

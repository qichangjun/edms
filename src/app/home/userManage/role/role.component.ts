import { Component,OnInit,AfterViewInit } from '@angular/core';

@Component({
  selector: 'role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit,AfterViewInit{
  parameter : Parameter = {
    type : null
  }
  constructor(
  ) {}
  ngAfterViewInit(){
  }
  ngOnInit(){
  }
}

export class Parameter {
  type : string
}

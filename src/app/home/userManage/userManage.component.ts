import { Component,OnInit,AfterViewInit,trigger, transition, style, animate,state,ViewChild } from '@angular/core';
import { slideInDownAnimation } from '@coreModule/animations/animations'
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '@commonService/constant.service';
import { EventService } from '@commonService/behavior.service';

@Component({
  selector: 'user-manage',
  templateUrl: './userManage.component.html',
  styleUrls: ['./userManage.component.scss'],
  animations: [trigger(
    'enterAnimation', [
      state('inactive',
        style({width: '0px'})
      ),
      state('active',
        style({width: '250px'})
      ),
      transition('inactive => active', animate('500ms ease-in',style({width: '250px'}))),
      transition('active => inactive', animate('500ms ease-out',style({width: '0px'})))
    ]
  )]
})
export class UserManageComponent implements OnInit,AfterViewInit{
  @ViewChild('sideBar') sideBar:any;
  @ViewChild('childComponent') childComponent:any;
  showSide : string = 'active';
  subscription : any;                       //事件传递,用于从最外层传递隐藏左侧树的广播
  parameter : Parameter = {
    docbase : 'company_file'
  };
  companyBase : string;
  projectBase : string;
  constructor(
    private router: Router,
    private constantService : ConstantService,
    private _EventService : EventService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      this.parameter.docbase = params['docbase'] || this.constantService.companyBase()
    });
    this.subscription = this._EventService.toggleEvent$.subscribe(bool => {
      if (bool.toString() == 'true'){
        this.showSide = 'active'
      }else if (bool.toString() == 'false') {
        this.showSide = 'inactive'
      }
    });
  }
  ngAfterViewInit(){
  }
  ngOnInit(){
    this.companyBase = this.constantService.companyBase()
    this.projectBase = this.constantService.projectBase()
  }
  changeBase(){
    this.router.navigate([], { queryParams: this.parameter });
  }
}

export class Parameter {
  docbase : string
}

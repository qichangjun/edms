import { Component, OnInit,ViewChild } from '@angular/core';
import { EventService } from '../../../services/behavior.service';
import { MenuItem } from 'primeng/primeng';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolBarService } from './toolBar.service';
import { ConstantService } from '../../../services/constant.service';

@Component({
  selector: 'main-tool-bar',
  templateUrl: './toolBar.component.html',
  styleUrls: ['./toolBar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  showSideBar : boolean = true;
  items: MenuItem[];
  keywords : any;
  loading : boolean = false;
  isHidden : any;
  constructor(
    private _constantService : ConstantService,
    private _toolBarService : ToolBarService,
    private route: ActivatedRoute,
    private router: Router,
    private _EventService : EventService,
    public translate : TranslateService
  ) {}
  ngOnInit() {
    this.getShowObJ()
  }
  toggleTree(){
    this.showSideBar = !this.showSideBar;
    this._EventService.toggleEvent(this.showSideBar)
  }
  changeLanguage(language){
    this.translate.use(language);
    localStorage.setItem('currentLanguage', language);
    window.location.reload()
  }
  getShowObJ(){
    this._toolBarService.getShowObJ(this._constantService.companyBase()).subscribe(
      data => {
        this.loading = false
        let info = data.json();
        this.isHidden = info.data.hidden.toString()
      }
    )
  }
  changeShowObj(){
    this._toolBarService.changeShowObJ(this._constantService.companyBase(),this.isHidden).subscribe(
      data => {
        this.loading = false
        let info = data.json();
        if (info.code == 1){
          window.location.reload()
        }
      }
    )
  }
  searchUser(){
    this.router.navigate([], { queryParams: {keywords:this.keywords} });
  }
}



import { Component,OnInit } from '@angular/core';
import { ConstantService } from '../services/constant.service'
@Component({
  selector: 'home',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  hrefList : any = {};
  keywords : string = '';
  constructor(
    private _constantService : ConstantService
  ) {}
  ngOnInit() {
    this.hrefList = this._constantService.hrefList()
  }
  fullSearch(){
    window.open(this.hrefList.fullSearch +this.keywords)
  }
}


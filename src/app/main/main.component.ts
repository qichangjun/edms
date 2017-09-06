import { Component,OnInit } from '@angular/core';
import { ConstantService } from '@commonService/constant.service'
import { FileBaseService } from '@fileBaseModule/fileBase.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  hrefList : any = {};
  docLists : Array<any> = [];
  keywords : string = '';
  newWin : any;
  constructor(
    private _constantService : ConstantService,
    private _fileBaseService : FileBaseService,
    public toastr: ToastsManager,
    private router: Router,
  ) {}
  ngOnInit() {
    this.hrefList = this._constantService.hrefList();
    this.docLists = this._constantService.docIdsLInk();
  }
  fullSearch(){
    window.open(this.hrefList.fullSearch +this.keywords)
  }
  findPath(doc){    
    this._fileBaseService.getPosition(doc.objectId,doc.docbase).then(
      data => {                
        this.gotoPosition(data[0],doc)
      }
    )
  }

  gotoPosition(position,data){    
    this._fileBaseService.searchIdsByPosition(data,position).then(
      data => {
        let ids = ['0'];
          ids = ids.concat(data);                    
          this.router.navigate(['fileBase'], { queryParams: {ids:ids,docbase:data.docbase} });
      }
    )
  }
}


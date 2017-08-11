import { Component,Inject,OnInit,AfterViewInit,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService } from '../../index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { ConstantService } from '../../../../services/constant.service';

/**
 * 查看位置组件
 * */
@Component({
  selector: 'check-position',
  templateUrl: './check-position.html',
})
export class checkPositionDialog implements OnInit{
  loading : boolean = false;
  positionLists : Array<any> = [];
  constructor(
    private _constantService  : ConstantService,
    private fileBaseService : FileBaseService,
    public dialogRef: MdDialogRef<checkPositionDialog>,
    public toastr: ToastsManager,
    @Inject(MD_DIALOG_DATA) public data: any
  ){}
  cancel(){
    this.dialogRef.close(false);
  }
  ngOnInit() {
    this.getPosition()
  }
  getPosition(){
    this.fileBaseService.getPosition(this.data).subscribe(
      data => {
        let info = data.json();
        if (info.code == 1) {
          this.positionLists = info.data
        }
      }
    )
  }
  gotoPosition(position){
    let newWin = window.open('loading page');
    this.fileBaseService.searchIdsByPosition(this.data,position).subscribe(
      data => {
        let info = data.json();
        if (info.code == 1) {
          let ids = ['0'];
          ids = ids.concat(info.data);
          for (let i = 0 ;i < ids.length;i ++){
            ids[i] = 'ids=' + ids[i]
          }
          let _str = ids.join('&');
          if (this.data.docbase == this._constantService.projectBase()){
            newWin.location.href = '/edms/#/projectFile?' + _str
          }else {
            newWin.location.href = '/edms/#/fileBase?' + _str
          }
        }else{
          this.toastr.error(info.message);
        }
      }
    )
  }
}

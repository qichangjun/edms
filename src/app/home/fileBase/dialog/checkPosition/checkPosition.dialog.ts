import { Component,Inject,OnInit,AfterViewInit,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService } from '../../index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { ConstantService } from '@commonService/constant.service';

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
    this.fileBaseService.getPosition(this.data.selected[0].r_object_id,this.data.docbase).then(
      data => {
        this.positionLists = data
      }
    )
  }
  gotoPosition(position){
    let newWin = window.open('loading page');
    this.fileBaseService.searchIdsByPosition(this.data,position).then(
      data => {
        let ids = ['0'];
          ids = ids.concat(data);
          for (let i = 0 ;i < ids.length;i ++){
            ids[i] = 'ids=' + ids[i]
          }
          let _str = ids.join('&');
          if (this.data.docbase == this._constantService.projectBase()){
            newWin.location.href = '/edms/#/projectFile?' + _str
          }else {
            newWin.location.href = '/edms/#/fileBase?' + _str
          }
      }
    )
  }
}

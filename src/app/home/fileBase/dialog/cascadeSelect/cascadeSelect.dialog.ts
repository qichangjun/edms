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
  selector: 'cascade-select-dialog',
  templateUrl: './cascadeSelect.dialog.html',
})
export class cascadeSelectDialog implements OnInit{
  loading : boolean = false;
  positionLists : Array<any> = [];
  selectLists : Array<any> = [];
  constructor(
    private _constantService  : ConstantService,
    private fileBaseService : FileBaseService,
    public dialogRef: MdDialogRef<cascadeSelectDialog>,
    public toastr: ToastsManager,
    @Inject(MD_DIALOG_DATA) public data: any
  ){}
  cancel(){
    this.dialogRef.close(false);
  }
  ngOnInit() {    
      this.selectLists = Object.assign([], this.data.attr.attrValues)
  }
  setProperty(){
    this.dialogRef.close(this.selectLists);    
  }
}

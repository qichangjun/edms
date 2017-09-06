import { Component,Inject,OnInit,AfterViewInit,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService } from '../../index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';

/*设置多选属性*/
@Component({
  selector: 'select-user',
  templateUrl: './selectUser.dialog.html',
})
export class selectUserDialog implements OnInit{
  selectedList : Array<any> = [];
  value : Array<any> = []
  loading : boolean = false;
  constructor(
    private fileBaseService : FileBaseService,
    public dialogRef: MdDialogRef<selectUserDialog>,
    @Inject(MD_DIALOG_DATA) public data: any
  ){}
  cancel(){
    this.dialogRef.close(false);
  }

  ngOnInit() {
    //if (this.data.attrValue) {
    //  this.selectedList.push(this.data.attrValue)
    //}
  }

  setUser(){
    this.value = []
    this.selectedList.forEach((attr) => {
      if (attr.isChecked){
        this.value.push(attr)
      }
    });
    if (this.value.length > 0){
      this.dialogRef.close(this.value);
    }else{
      this.dialogRef.close(false);
    }  
  }
}

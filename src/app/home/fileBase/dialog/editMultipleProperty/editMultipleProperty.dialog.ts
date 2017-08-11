import { Component,Inject,OnInit,AfterViewInit,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService } from '../../index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';

/*设置多选属性*/
@Component({
  selector: 'edit-multiple-property',
  templateUrl: './edit-multiple-property.html',
})
export class editMultipleDialog implements OnInit{
  entity : any = {};
  attrLists : Array<any> = [];
  loading : boolean = false;
  constructor(
    private fileBaseService : FileBaseService,
    public dialogRef: MdDialogRef<editMultipleDialog>,
    @Inject(MD_DIALOG_DATA) public data: any
  ){}
  cancel(){
    this.dialogRef.close(false);
  }
  ngOnInit() {
    this.attrLists = this.data.attr.attrOptions
    if (this.data.attr.attrValue){
      let arr = this.data.attr.attrValue.split(',')
      this.attrLists.filter((c)=>{
        return (arr.indexOf(c.name) != -1)
      }).map((item)=>{
        item['isChecked'] = true
      })
    }

  }
  setProperty(){
    let value = []
    this.attrLists.forEach((attr) => {
      if (attr.isChecked){
        value.push(attr.name)
      }
    });
    this.dialogRef.close(value);
  }
}

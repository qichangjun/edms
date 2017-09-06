import { Component,Inject,OnInit,AfterViewInit,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService,editMultipleDialog } from '../../index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';

/**
 * 新建文件柜
 * @params this.data={parentId:父文件夹Id}
 * @params attrLists:文件柜的属性
 * */
@Component({
  selector: 'new-fileCabinet',
  templateUrl: './new-fileCabinet.html',
  styleUrls: ['../css/fileBase.dialog.scss'],
})
export class newFileCabinetDialog implements OnInit{
  loading : boolean = false;
  showMoreAttr : boolean = false;
  attrLists : Array<any> = [];
  firstInitMoreInfo : boolean = false;
  constructor(
    public dialog: MdDialog,
    private fileBaseService : FileBaseService,
    public toastr: ToastsManager,
    public dialogRef: MdDialogRef<newFileCabinetDialog>,
    vcr: ViewContainerRef,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
  }
  public entity : any = {};
  cancel(){
    this.dialogRef.close(false);
  }
  newFileCabinet(){
    this.loading = true;
    this.fileBaseService.newFileCabinet(this.entity,this.attrLists).then(
      data => {
        this.loading = false;
        this.dialogRef.close(true);        
      },
      error => {
        this.loading = false;
      }
    );
  }
  ngOnInit(){
    this.entity.parentId = this.data.parentId;
    this.entity.docbase = this.data.docbase;
    this.entity.typeName = 'dm_cabinet';
    this.checkAttrList(1);
  }

  showMore(){
    this.showMoreAttr = true;
    if (!this.firstInitMoreInfo){
      this.checkAttrList(2)
    }
  }
  checkAttrList(option){
    this.fileBaseService.checkAttrList(this.entity,this.data.docbase,option).then(
      data => {
        if (option == 1){
          this.attrLists = data
        }else {
          this.firstInitMoreInfo = true
          data.forEach((c)=>{
            c['isMore'] = true
          })
          this.attrLists = this.attrLists.concat(data)
        }
      }
    );
  }
}

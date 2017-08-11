import { Component,Inject,OnInit,AfterViewInit,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService } from '../../index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { ConstantService } from '../../../../services/constant.service';

/**
 * 删除文件
 * */
@Component({
  selector: 'set-mul-property',
  templateUrl: './set-mul-property.html',
  styleUrls: ['../css/fileBase.dialog.scss'],
})
export class setMulProDialog implements OnInit{
  loading : boolean = false;
  showMoreFolderAttr : boolean = false;
  showMoreDocumentAttr : boolean = false;
  public entity : any = {};
  folderAttrLists : Array<any> = [];
  documentAttrLists : Array<any> = [];
  constructor(
    private fileBaseService : FileBaseService,
    public dialogRef: MdDialogRef<setMulProDialog>,
    public toastr: ToastsManager,
    @Inject(MD_DIALOG_DATA) public data: any
  ){}
  cancel(){
    this.dialogRef.close(false);
  }
  ngOnInit() {
    this.entity.typeName = 'wison_folder'
    this.checkAttrList(1,'folderAttrLists')
    this.entity.typeName = 'wison_prj_document'
    this.checkAttrList(1,'documentAttrLists')
  }
  checkAttrList(option,attrList){
    this.fileBaseService.checkAttrList(this.entity,this.data.docbase,option).subscribe(
      data => {
        let info = data.json();
        if (info.code==1) {
          if (option == 1){
            this[attrList] = info.data
          }else {
            this[attrList] = this[attrList].concat(info.data)
          }
        }else {
          this.toastr.error(info.message);
        }
      }
    );
  }
  setMulPro(){
    console.log(this.folderAttrLists,this.documentAttrLists)
  }
}

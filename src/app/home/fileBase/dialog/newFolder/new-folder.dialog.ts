import { Component,Inject,OnInit,AfterViewInit,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService,editMultipleDialog } from '../../index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';

/**
 * 新建文件夹模块
 * @params this.data={parentId:父文件夹Id}
 * @params attrLists:文件夹的属性
 * @function editMultiple:打开编辑多重属性组件
 * */
@Component({
  selector: 'new-folder',
  templateUrl: './new-folder.html',
  styleUrls: ['../css/fileBase.dialog.scss']
})
export class newFolderDialog implements OnInit{
  loading : boolean = false;
  showMoreAttr : boolean = false;
  attrLists : Array<any> = [];
  constructor(
    public dialog: MdDialog,
    private fileBaseService : FileBaseService,
    public toastr: ToastsManager,
    public dialogRef: MdDialogRef<newFolderDialog>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
  }
  public entity : any = {};
  cancel(){
    this.dialogRef.close(false);
  }
  newFolder(){
    this.loading = true;
    this.fileBaseService.newFolder(this.entity,this.data.docbase,this.attrLists).subscribe(
      data => {
        this.loading = false;
        let info = data.json();
        if (info.code==1) {
          this.toastr.success(info.message);
          this.dialogRef.close(true);
        }else {
          this.toastr.error(info.message);
        }
      }
    );
  }
  editMultiple(attr){
    let conifg = new MdDialogConfig();
    conifg.data = {
      attr : attr
    };
    conifg.height = '800px';
    conifg.width = '600px';
    let dialogRef = this.dialog.open(editMultipleDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        attr.attrValue = result.join(',')
      }
    });
  }
  ngOnInit(){
    this.entity.parentId = this.data.parentId;
    this.entity.typeName = 'wison_folder'
    this.checkAttrList(1)
  }
  checkAttrList(option){
    this.fileBaseService.checkAttrList(this.entity,this.data.docbase,option).subscribe(
      data => {
        let info = data.json();
        if (info.code==1) {
          if (option == 1){
            this.attrLists = info.data
          }else {
            this.attrLists = this.attrLists.concat(info.data)
          }
        }else {
          this.toastr.error(info.message);
        }
      }
    );
  }
}

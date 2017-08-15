import { Component,Inject,OnInit,AfterViewInit,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService,editMultipleDialog,selectUserDialog } from '../../index';
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
  selector: 'remove-file-confirm',
  templateUrl: './removeFileConfirm.dialog.html',
  styleUrls: ['../css/fileBase.dialog.scss']
})
export class removeFileConfirmDialog implements OnInit{
  loading : boolean = false;
  showMoreAttr : boolean = false;
  attrLists : Array<any> = [];
  constructor(
    public dialog: MdDialog,
    private fileBaseService : FileBaseService,
    public toastr: ToastsManager,
    public dialogRef: MdDialogRef<removeFileConfirmDialog>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
  }
  public entity : any = {};
  cancel(){
    this.dialogRef.close(false);
  }

  ngOnInit(){
  }
  deleteCabinet(){
    this.fileBaseService.deleteFile(this.data.params,this.data.docbase,this.data.parentId).subscribe(
      data => {
        let info = data.json();
        if (info.code == 1) {
          this.dialogRef.close(true);
          this.toastr.success(info.message);
        }else {
          this.toastr.error(info.message);
        }
      }
    )
  }
}

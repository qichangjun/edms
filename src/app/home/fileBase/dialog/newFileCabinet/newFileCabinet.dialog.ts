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
  constructor(
    public dialog: MdDialog,
    private fileBaseService : FileBaseService,
    public toastr: ToastsManager,
    public dialogRef: MdDialogRef<newFileCabinetDialog>,
    vcr: ViewContainerRef,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public entity : any = {};
  cancel(){
    this.dialogRef.close(false);
  }
  newFileCabinet(){
    this.loading = true;
    this.fileBaseService.newFileCabinet(this.entity).subscribe(
      data => {
        this.loading = false;
        let info = data.json();
        if (info.code==1) {
          this.dialogRef.close(true);
        }else {
          this.toastr.error(info.message);
        }
      }
    );
  }
  ngOnInit(){
    this.entity.parentId = this.data.parentId;
    this.entity.docbase = this.data.docbase;
    this.entity.title = '在建'
  }
}

import { Component,Inject,OnInit,AfterViewInit,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService } from '../../index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'export-FolderLimits',
  templateUrl: './export-FolderLimits.html',
  styleUrls: ['../css/fileBase.dialog.scss']
})
export class exportCurrFolderLimitsDialog implements OnInit{
  loading : boolean = false;
  exportToHtml : number = 0;
  cascade : number = 0;
  constructor(
    private fileBaseService : FileBaseService,
    public dialogRef: MdDialogRef<exportCurrFolderLimitsDialog>,
    public toastr: ToastsManager,
    @Inject(MD_DIALOG_DATA) public data: any
  ){}
  cancel(){
    this.dialogRef.close(false);
  }
  ngOnInit() {}
  exportLimits(){
    this.fileBaseService.exportLimits(this.data,this.cascade,this.exportToHtml)
    this.dialogRef.close(false);
  }
}

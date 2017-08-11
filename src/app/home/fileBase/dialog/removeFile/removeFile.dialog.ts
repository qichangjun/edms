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
  selector: 'remove-file',
  templateUrl: './remove-file.html',
  styleUrls: ['../css/fileBase.dialog.scss'],
})
export class removeFileDialog implements OnInit{
  index : number = 0
  loading : boolean = false;
  constructor(
    private fileBaseService : FileBaseService,
    public dialogRef: MdDialogRef<removeFileDialog>,
    public toastr: ToastsManager,
    @Inject(MD_DIALOG_DATA) public data: any
  ){}
  cancel(){
    this.dialogRef.close(false);
  }
  ngOnInit() {
    this.getDeleteInfo(this.index)
  }
  getDeleteInfo(index : number){
    this.loading = true
    this.fileBaseService.getDeleteInfo(this.data.rows[index].r_object_id,this.data.docbase).subscribe(
      data => {
        this.loading = false
        let info = data.json();
        if (info.code == 1) {
          this.data.rows[index].info = info.data
          if(this.data.rows[index].info.isMultiVersions){
            this.data.rows[index].info.type = 2
          }else if (this.data.rows[index].info.isMultiLinks){
            this.data.rows[index].info.type = 1
          }
          else {
            this.data.rows[index].info.type = 0
          }
        }
      }
    )
  }
  deleteFile(){
    this.loading = true
    let params = {
      ids : [],
      types : []
    };
    this.data.rows.forEach((row)=>{
      params.ids.push(row.r_object_id)
      if (row.info && row.info.type){
        params.types.push(row.info.type)
      }else{
        params.types.push(0)
      }
    })
    this.fileBaseService.deleteFile(params,this.data.docbase,this.data.parentId).subscribe(
      data => {
        this.loading = false
        let info = data.json();
        if (info.code == 1) {
          this.toastr.success(info.message);
          this.dialogRef.close(true);
        }else {
          this.toastr.error(info.message);
        }
      }
    )
  }
}

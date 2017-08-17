import { Component,Inject,OnInit,AfterViewInit,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService } from '../../index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { FileSelectDirective, FileDropDirective, FileUploader,FileUploaderOptions } from 'ng2-file-upload/ng2-file-upload';
import { ConstantService } from '../../../../services/constant.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { ApiUrlService } from '../../../../services/apiUrl.service';

//
@Component({
  selector: 'version-manage',
  templateUrl: './version-manage.html',
  styleUrls: ['../css/fileBase.dialog.scss']
})
export class versionManageDialog implements OnInit{
  loading : boolean = false;
  versionList : Array<any> = [];
  currentVersion : string;
  public uploaderNewest:FileUploader = new FileUploader({queueLimit:500,autoUpload:true,url: this._constantService.baseUrl() + '/version/replace',
    additionalParameter: {
      accessToken : this._authenticationService.getCurrentUser().accessToken,
      accessUser : this._authenticationService.getCurrentUser().accessUser}});
  public uploader:FileUploader = new FileUploader({queueLimit:500,autoUpload:true,url: this._constantService.baseUrl() + '/version/upgrade',
    additionalParameter: {
      accessToken : this._authenticationService.getCurrentUser().accessToken,
      accessUser : this._authenticationService.getCurrentUser().accessUser}});
  constructor(
    private _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService,
    private _constantService  : ConstantService,
    private fileBaseService : FileBaseService,
    public dialogRef: MdDialogRef<versionManageDialog>,
    public toastr: ToastsManager,
    @Inject(MD_DIALOG_DATA) public data: any
  ){}
  cancel(){
    this.dialogRef.close(false);
  }
  ngOnInit() {
    let _self = this
    this.getVersionList()
    this.uploaderNewest.onBeforeUploadItem = (fileItem) =>{
      _self.uploaderNewest.options.additionalParameter['docbase'] = this.data.docbase;
      _self.uploaderNewest.options.additionalParameter['id'] = this.currentVersion;
    }
    this.uploader.onBeforeUploadItem = (fileItem) =>{
      _self.uploader.options.additionalParameter['docbase'] = this.data.docbase;
      _self.uploader.options.additionalParameter['id'] = this.currentVersion;
    }
    this.uploaderNewest.onSuccessItem = (fileItem, res)=>{
      let data = JSON.parse(res);
      if (data.code == 1){
        this.getVersionList()
        this.toastr.success(data.message)
      }else{
        this.toastr.error(data.message)
      }
    }
    this.uploader.onSuccessItem = (fileItem, res)=>{
      let data = JSON.parse(res);
      if (data.code == 1){
        this.getVersionList()
        this.toastr.success(data.message)
      }else{
        this.toastr.error(data.message)
      }
    }
  }
  getVersionList(){
    this.fileBaseService.getVersionList(this.data).subscribe(
      data => {
        this.loading = false
        let info = data.json();
        if (info.code == 1) {
          this.versionList = info.data
          this.versionList.forEach((version)=>{
            if (version['r_version_label'].indexOf('CURRENT') != -1){
              this.currentVersion = version.r_object_id
              version['isCurrentVersion'] = true
            }
          })
        }
      }
    )
  }
  remove(id){
    this.fileBaseService.removeCurrentVersion(id,this.data).subscribe(
      data => {
        this.loading = false
        let info = data.json();
        if (info.code == 1) {
          this.toastr.success(info.message);
          this.getVersionList()
        }else{
          this.toastr.error(info.message);
        }
      }
    )
  }
  download(id){
    this.fileBaseService.download(id,this.data)
  }
}

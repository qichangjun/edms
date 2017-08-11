import { Component, HostBinding,AfterViewInit,OnInit } from '@angular/core';
import { Router,ActivatedRoute }                 from '@angular/router';
import { EventService } from '../../services/behavior.service'
import { slidFromBottomAnimation } from '../../core/animations/animations';
import { ConstantService } from '../../services/constant.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  templateUrl: './uploadFile.component.html',
  styleUrls : ['./uploadFile.component.scss'],
  animations: [ slidFromBottomAnimation ]
})
export class UploadFileComponent implements AfterViewInit,OnInit{
  uploader : any = {};
  dragTotal : number = 0;
  selectTotal : number = 0;
  dragSuccessTotal : number = 0;
  selectSuccessTotal : number = 0;
  docbase : string;
  dragUploader : any = {};
  constructor(
    private route: ActivatedRoute,
    private _constantService  : ConstantService,
    private router: Router,
    private _EventService : EventService,
    public toastr: ToastsManager
  ) {}
  ngOnInit(){
    this.route.url.subscribe(
      (data: any) => {
        for (let i of data) {
          if (i.path == 'fileBase'){
            this.docbase = this._constantService.companyBase()
          }
          else {
            this.docbase = this._constantService.projectBase()
          }
        }
      });
  }
  send() {
    setTimeout(() => {
      this.closePopup();
    }, 1000);
  }
  cancel() {
    this.closePopup();
  }
  closePopup() {
    this.router.navigate([{ outlets: { uploadFile: null }}],{preserveQueryParams: true});
  }
  ngAfterViewInit(){
    this._EventService.toggleEvent$.subscribe(uploader => {
      if (uploader){
        if (uploader.type == 'select'){
          this.uploader = uploader.value;
          this.selectTotal = this.uploader.queue.length;
          this.selectSuccessTotal = 0;
          for (let i = 0;i < this.uploader.queue.length;i++){
            this.uploader.queue[i].path = this.uploader.queue[i]._file.webkitRelativePath.split('/');
            this.uploader.queue[i].parentFolder = this.uploader.queue[i].path[this.uploader.queue[i].path.length - 2] || null
            if (this.uploader.queue[i].isSuccess){
              this.selectSuccessTotal++
            }
          }
          this.uploader.onSuccessItem = (item,res)=>{
            if (res){
              let data = JSON.parse(res)
              if (data.code == 1){
                this.selectSuccessTotal++
              }else{
                item.isSuccess = false
                item.isError = true
                this.toastr.error(data.message)
              }
            }else{
              item.isSuccess = false
              item.isError = true
            }

          }
          this.uploader.onBeforeUploadItem = (fileItem) =>{
            this.uploader.options.additionalParameter['parentId'] = fileItem._file['parentId']
            this.uploader.options.additionalParameter.fullPath = fileItem._file.webkitRelativePath || '/' + fileItem._file.name
            this.uploader.options.additionalParameter.docbase = this.docbase
          }
        }
        //else if (uploader.type == 'drag'){
        //  let _self = this
        //  this.dragUploader = uploader.value;
        //  this.dragTotal = this.dragUploader.files.length;
        //  this.dragSuccessTotal = 0;
        //  for (let i = 0;i < this.dragUploader.files.length;i++){
        //    if (this.dragUploader.files[i].fullPath){
        //      this.dragUploader.files[i].path = this.dragUploader.files[i].fullPath.split('/');
        //      this.dragUploader.files[i].parentFolder = this.dragUploader.files[i].path[this.dragUploader.files[i].path.length - 2] || null
        //    }
        //    if (this.dragUploader.files[i].status == 'success'){
        //      this.dragSuccessTotal++
        //    }
        //  }
        //  this.dragUploader.on('success',function(file){
        //    _self.dragSuccessTotal = 0;
        //    for (let i = 0;i < _self.dragUploader.files.length;i++){
        //      if (_self.dragUploader.files[i].status == 'success'){
        //        _self.dragSuccessTotal++
        //      }
        //    }
        //  })
        //  this.dragUploader.on('sending',function (file, xhr, data) {
        //    if(file.fullPath){
        //      data.append("fullPath", file.fullPath);
        //    }
        //  });
        //}
      }
    });
  }
  removeAllFiles(){
    if (this.dragUploader.files && this.dragUploader.files.length > 0){
      this.dragUploader.removeAllFiles()
    }
    if (this.uploader.queue && this.uploader.queue.length > 0){
      this.uploader.clearQueue()
    }
    this.dragTotal = 0;
    this.selectTotal = 0;
  }
  uploadFile(file){
    this.dragUploader.processFile(file)
  }
  removeFile(file){
    this.dragUploader.removeFile(file)
  }
}

import { Component, OnInit } from '@angular/core';
import { FileBaseService,editMultipleDialog } from '@fileBaseModule/index';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ConstantService } from '@commonService/constant.service'

@Component({
  selector: 'app-preview-doc',
  templateUrl: './preview-doc.component.html',
  styleUrls: ['./preview-doc.component.scss']
})
export class PreviewDocComponent implements OnInit {
  doc = {}
  loading : boolean = false;
  row : any = {};
  firstInitMoreInfo : boolean = false;
  parameter : any = {};
  attrList : Array<any> = [];
  editStatus : boolean = false;
  showMoreAttr : boolean = false;
  isDownloading : boolean = false;
  previewUrl : any;
  constructor(
    public dialog: MdDialog,
    public MdDialogConfig : MdDialogConfig,
    private route: ActivatedRoute,
    private fileBaseService : FileBaseService,
    public sanitizer: DomSanitizer,
    private _constantService : ConstantService
  ) { 
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['r_object_id']) {
        this.row['r_object_id'] = params['r_object_id'];
      }
      if (params['object_name']) {
        this.row['object_name'] = params['object_name'];
      }
      if (params['r_object_type']) {
        this.row['r_object_type'] = params['r_object_type'];
      }
      if (params['docbase']) {
        this.parameter['docbase'] = params['docbase'];        
      }
      if (params['contentType']) { 
        this.row['contentType'] = params['contentType']
      }
    });
    // window.hsConfig.filePreviewBaseUrl+parameter.objectId    
    this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this._constantService.previewUrl() + '?objectId=' + this.row['r_object_id'])
    this.getInfo(1)
  }

  

  getInfo(option){
    this.loading = true
    this.fileBaseService.getInfo(this.row,this.parameter,option).then(
      data => {
        this.loading = false
        if (option == 2){
            this.firstInitMoreInfo = true
            data.forEach((c)=>{
              c['isMore'] = true
            })
            this.attrList = this.attrList.concat(data)
          }else{
            this.firstInitMoreInfo = false
            this.attrList = data
            this.editStatus = false;
        }
        this.attrList.forEach((c)=>{
          if (c.inputMode == 2) {
            c.attrValue = c.attrValue || null
          }
        })
      },
      error => {
        this.loading = false
      }
    )
  }

  showMore(){
    this.showMoreAttr = true;
    if (!this.firstInitMoreInfo){
      this.getInfo(2)
    }
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
  updateInfo(){
    this.loading = true
    this.fileBaseService.updateInfo(this.row.r_object_id,this.attrList,this.parameter.docbase).then(
      data => {
        this.loading = false
        this.editStatus=false
        return
      },
      error => {
        this.loading = false
      }
    )
  }

  fullScreen(){
    window.open(this._constantService.previewUrl() + '?objectId=' + this.row['r_object_id'])
    return
  }
  
  goBack(){
    window.close();
    return
  }

  downloadDoc(){
    let ids = [this.row['r_object_id']]
    this.fileBaseService.download(ids,this.parameter)    
    return
  }
  
  onLoad() {
    console.log('onLoad executed');
}
}

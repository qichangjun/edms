import { Component,Inject,OnInit,AfterViewInit,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService,editMultipleDialog } from '../../index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MD_DIALOG_DATA,MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
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
  showMoreAttr : any = {
    wison_folder : false,
    wison_prj_folder : false,
    wison_document : false,
    wison_prj_document : false
  }
  attrList : any = {
    wison_folder : [],
    wison_prj_folder : [],
    wison_document : [],
    wison_prj_document : []
  };
  typeLists : Array<any> = [];
  selectedIndex : number = 0;
  firstInitMoreInfo : any = {
    wison_folder : false,
    wison_prj_folder : false,
    wison_document : false,
    wison_prj_document : false
  };
  public entity : any = {};
  constructor(
    public dialog: MdDialog,
    public MdDialogConfig : MdDialogConfig,
    private fileBaseService : FileBaseService,
    public dialogRef: MdDialogRef<setMulProDialog>,
    public toastr: ToastsManager,
    @Inject(MD_DIALOG_DATA) public data: any
  ){}
  cancel(){
    this.dialogRef.close(false);
  }
  ngOnInit() {
    this.fileBaseService.getListTypes(this.data).subscribe(
      data => {
        let info = data.json();
        if (info.code==1) {
          this.typeLists = info.data
        }else {
          this.toastr.error(info.message);
        }
      }
    )
  }
  checkAttrList(option,attrList){
    this.fileBaseService.checkAttrList(this.entity,this.data.docbase,option).subscribe(
      data => {
        let info = data.json();
        if (info.code==1) {
          if (this.attrList[attrList].length == 0 && option == 1){
            this.attrList[attrList] = info.data
          }else if (option == 2){
            this.firstInitMoreInfo[attrList] = true
            info.data.forEach((c)=>{
              c['isMore'] = true
            })
            this.attrList[attrList] = this.attrList[attrList].concat(info.data)
          }
        }else {
          this.toastr.error(info.message);
        }
      }
    );
  }
  showMore(attrList){
    this.showMoreAttr[attrList] = true;
    if (!this.firstInitMoreInfo[attrList]){
      this.checkAttrList(2,attrList)
    }
  }
  selectedIndexChange(){
    this.entity.typeName = this.typeLists[this.selectedIndex].typeName
    this.checkAttrList(1,this.entity.typeName)
  }
  setMulPro(){
    let attrLists = this.attrList
    this.fileBaseService.setMulPro(this.data,this.entity.typeName,attrLists).subscribe(
      data => {
        let info = data.json();
        if (info.code==1) {
          this.toastr.success(info.message);
          this.dialogRef.close(true);
        }else {
          this.toastr.error(info.message);
        }
      }
    )

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
}

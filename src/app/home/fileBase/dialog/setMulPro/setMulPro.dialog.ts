import { Component,Inject,OnInit,AfterViewInit,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService,editMultipleDialog,selectUserDialog,cascadeSelectDialog,inputMultipleDialog } from '../../index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MD_DIALOG_DATA,MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { ConstantService } from '@commonService/constant.service';


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
    this.fileBaseService.getListTypes(this.data).then(
      data => {
        this.typeLists = data
      }
    )
  }
  checkAttrList(option,attrList){
    this.fileBaseService.checkAttrList(this.entity,this.data.docbase,option).then(
      data => {
        if (this.attrList[attrList].length == 0 && option == 1){
            this.attrList[attrList] = data
        }else if (option == 2){
          this.firstInitMoreInfo[attrList] = true
          data.forEach((c)=>{
            c['isMore'] = true
          })
          this.attrList[attrList] = this.attrList[attrList].concat(data)
        }
        this.attrList[attrList].forEach((c)=>{
            if (c.inputMode == 2) {
              c.attrValue = null
            }
        })
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
        console.log(result)
        attr.attrValues = result
      }
    });
  }
  selectUser(attr){
    let conifg = new MdDialogConfig();
    conifg.data = {
      //attrValue : attr.attrValue,
      docbase : this.data.docbase,
      type : "user",
      selectType : 'single'
    };
    conifg.height = '800px';
    conifg.width = '600px';
    let dialogRef = this.dialog.open(selectUserDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        attr.attrValue = result[0].objectName
      }
    });
  }
  selectUsers(attr){
    let conifg = new MdDialogConfig();
    conifg.data = {
      //attrValue : attr.attrValue,
      docbase : this.data.docbase,
      type : "user",
      selectType : 'mult'
    };
    conifg.height = '800px';
    conifg.width = '600px';
    let dialogRef = this.dialog.open(selectUserDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        let _arr = []
        result.forEach(c => {
          _arr.push(c.objectName)          
        });
        attr.attrValues = _arr
      }
    });
  }
  cascadeSelectMul(attr){
    let conifg = new MdDialogConfig();
    let newAttr = Object.assign({}, attr)
    conifg.data = {
      docbase : this.data.docbase,
      selectType : 'mult',
      attr : newAttr
    };
    conifg.height = '800px';
    conifg.width = '1000px';
    let dialogRef = this.dialog.open(cascadeSelectDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result){        
        attr.attrValues = result
      }
    }); 
  }

  cascadeSelectSingle(attr){
    let conifg = new MdDialogConfig();
    let newAttr = Object.assign({}, attr)
    conifg.data = {
      docbase : this.data.docbase,
      selectType : 'single',
      attr : newAttr
    };
    conifg.height = '800px';
    conifg.width = '1000px';
    let dialogRef = this.dialog.open(cascadeSelectDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result){        
        attr.attrValues = result
      }
    }); 
  }

  inputMultiple(attr){
    let conifg = new MdDialogConfig();
    let newAttr = Object.assign({}, attr)
    conifg.data = {
      docbase : this.data.docbase,
      selectType : 'single',
      attr : newAttr
    };
    conifg.height = '800px';
    conifg.width = '1000px';
    let dialogRef = this.dialog.open(inputMultipleDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result){        
        attr.attrValues = result
      }
    }); 
  }

  setMulPro(){
    this.loading = true
    let attrLists = this.attrList
    this.fileBaseService.setMulPro(this.data,this.entity.typeName,attrLists).then(
      data => {
        this.loading = false
        this.dialogRef.close(true);
      },
      error => {
        this.loading = false
        return
      }
    )

  }
}

import { Component,Inject,OnInit,AfterViewInit,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService,editMultipleDialog,selectUserDialog,cascadeSelectDialog,inputMultipleDialog } from '../../index';
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
  firstInitMoreInfo : boolean = false;
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
    this.fileBaseService.newFolder(this.entity,this.data.docbase,this.attrLists).then(
      data => {
        this.loading = false;        
        this.dialogRef.close(true);
      },
      error => {
        this.loading = false
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
  ngOnInit(){
    this.entity.parentId = this.data.parentId;
    this.entity.typeName = 'wison_folder'
    this.checkAttrList(1)
  }

  showMore(){
    this.showMoreAttr = true;
    if (!this.firstInitMoreInfo){
      this.checkAttrList(2)
    }
  }
  checkAttrList(option){
    this.fileBaseService.checkAttrList(this.entity,this.data.docbase,option).then(
      data => {
        if (option == 1){
            this.showMoreAttr = false
            this.firstInitMoreInfo = false
            this.attrLists = data
        }else {
          this.firstInitMoreInfo = true
          data.forEach((c)=>{
            c['isMore'] = true
          })
          this.attrLists = this.attrLists.concat(data)
        }
      }
    );
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
}

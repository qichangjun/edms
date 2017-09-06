import { Component,OnInit,Input,OnChanges,SimpleChange } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { editMultipleDialog,FileBaseService,selectUserDialog,cascadeSelectDialog,inputMultipleDialog } from '../index'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'file-info',
  templateUrl: './fileInfo.component.html',
  styleUrls: ['./fileInfo.component.scss']
})
export class FileInfoComponent implements OnInit {
  attrList : Array<any> = [];
  limitList : Array<any> = [];
  @Input() sidenav : any;
  @Input() row : any = {};
  @Input() parameter : any;
  @Input() selectedLength : number = 0;
  currentTab : number = 0;
  firstInitMoreInfo : boolean = false;

  loading : boolean = false;
  showMoreAttr : boolean = false;
  editStatus : boolean = false;
  editLimit : boolean = false;
  constructor(
    public dialog: MdDialog,
    public MdDialogConfig : MdDialogConfig,
    private fileBaseService : FileBaseService,
    public toastr: ToastsManager
  ) {}
  ngOnInit() {}
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

  getLimit(){
    this.fileBaseService.getLimit(this.row,this.parameter).then(
      data => {
        this.loading = false
        this.limitList = data;
        this.editLimit = false
        this.sidenav._elementRef.nativeElement.style.width = 400 + 'px';
      },
      error => {
        this.loading = false
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
        attr.attrValues = result
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
  updateLimit(){
    this.loading = true
    this.fileBaseService.updateLimit(this.row.r_object_id,this.limitList,this.parameter.docbase).then(
      data => {
        this.loading = false
        this.getLimit();
        return
      },
      error => {
        this.loading = false
      }
    )
  }
  startEditLimit(){
    this.sidenav._elementRef.nativeElement.style.width = 800 + 'px';
    this.editLimit = true;
  }

  selectedIndexChange(){
    if (this.currentTab == 1) {
      this.sidenav._elementRef.nativeElement.style.width = 400 + 'px';
    }
    if (this.currentTab == 0 &&  this.editLimit == true) {
      this.sidenav._elementRef.nativeElement.style.width = 800 + 'px';
    }
  }

  selectUser(attr){
    let conifg = new MdDialogConfig();
    conifg.data = {
      //attrValue : attr.attrValue,
      docbase : this.parameter.docbase,
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
      docbase : this.parameter.docbase,
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
      docbase : this.parameter.docbase,
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
      docbase : this.parameter.docbase,
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
      docbase : this.parameter.docbase,
      selectType : 'single',
      attr : newAttr
    };
    conifg.height = '800px';
    conifg.width = '600px';
    let dialogRef = this.dialog.open(inputMultipleDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        attr.attrValues = result
      }
    });
  }
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    if (changes['row']) {
      if (changes['row'].currentValue){
        this.showMoreAttr = false;
        this.editStatus = false;
        this.getInfo(1)
        this.getLimit()
      }
    }
    //if (changes['selectedLength']){
    //  //if (this.selectedLength != 1){
    //  //  //this.sidenav.close()
    //  //}
    //}
  }
}


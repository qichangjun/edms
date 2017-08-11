import { Component,OnInit,Input,OnChanges,SimpleChange } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { editMultipleDialog,FileBaseService } from '../index'

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

  loading : boolean = false;
  showMoreAttr : boolean = false;
  editStatus : boolean = false;
  editLimit : boolean = false
  constructor(
    public dialog: MdDialog,
    public MdDialogConfig : MdDialogConfig,
    private fileBaseService : FileBaseService,
    public toastr: ToastsManager
  ) {}
  ngOnInit() {}
  getInfo(option){
    this.loading = true
    this.fileBaseService.getInfo(this.row,this.parameter,option).subscribe(
      data => {
        this.loading = false
        let info = data.json();
        if (info.code == 1) {
          if (option == 2){
            this.attrList = this.attrList.concat(info.data)
          }else{
            this.attrList = info.data
            this.editStatus = false;
          }
        }
        else if (info.code ==0) {
          this.attrList = []
          this.toastr.error(info.message);
        }
      }
    )
  }
  getLimit(){
    this.fileBaseService.getLimit(this.row,this.parameter).subscribe(
      data => {
        this.loading = false
        let info = data.json();
        if (info.code == 1) {
          this.limitList = info.data;
          this.editLimit = false
          this.sidenav._elementRef.nativeElement.style.width = 400 + 'px';
        }
        else if (info.code ==0) {
          this.limitList = []
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
  updateInfo(){
    this.loading = true
    this.fileBaseService.updateInfo(this.row.r_object_id,this.attrList,this.parameter.docbase).subscribe(
      data => {
        this.loading = false
        let info = data.json();
        if (info.code == 1) {
          this.editStatus=false
          return
        }
        else if (info.code ==0) {
          this.toastr.error(info.message);
        }
        console.log(this.attrList)
      }
    )
  }
  updateLimit(){
    console.log(this.limitList)
    this.getLimit();
  }
  startEditLimit(){
    this.sidenav._elementRef.nativeElement.style.width = 700 + 'px';
    this.editLimit = true;
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


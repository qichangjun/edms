import { Component,OnInit,Input,OnChanges,SimpleChange } from '@angular/core';
import { FileBaseService } from '../fileBase.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { editMultipleDialog } from '../fileBase.component'

@Component({
  selector: 'file-info',
  templateUrl: './fileInfo.component.html',
  styleUrls: ['./fileInfo.component.scss']
})
export class FileInfoComponent implements OnInit {
  attrList : Array<any> = [];
  @Input() sidenav : any;
  @Input() row : any = {};
  @Input() parameter : any;
  @Input() selectedLength : number = 0;

  showMoreAttr : boolean = false;
  editStatus : boolean = false;
  constructor(
    public dialog: MdDialog,
    public MdDialogConfig : MdDialogConfig,
    private fileBaseService : FileBaseService,
    public toastr: ToastsManager
  ) {}
  ngOnInit() {}
  getInfo(option){
    this.fileBaseService.getInfo(this.row,this.parameter,option).subscribe(
      data => {
        let info = data.json();
        if (info.code == 1) {
          if (option == 2){
            this.attrList = this.attrList.concat(info.data)
          }else{
            this.attrList = info.data
          }
        }
        else if (info.code ==0) {
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
        attr.attrValue = result
        console.log(result,attr)
      }
    });
  }
  updateInfo(){
    console.log (12344)
  }
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    if (changes['row']) {
      if (changes['row'].currentValue){
        this.showMoreAttr = false;
        this.editStatus = false;
        this.getInfo(1)
      }
    }
    //if (changes['selectedLength']){
    //  //if (this.selectedLength != 1){
    //  //  //this.sidenav.close()
    //  //}
    //}
  }
}


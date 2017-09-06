import { Component,Inject,OnInit,AfterViewInit,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService } from '../../index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { ConstantService } from '@commonService/constant.service';
import { UserService } from '@userModule/user.service'
import { GroupService } from '@groupModule/group.service'


@Component({
  selector: 'set-mulimits-jurisdiction',
  templateUrl: './set-mullimits-jurisdiction.html',
  styleUrls: ['../css/fileBase.dialog.scss'],
})
export class setMulJurisdictionDialog implements OnInit{
  loading : boolean = false;
  selectedList : Array<any> = [];
  userList : Array<any> = [];
  groupList : Array<any> = [];
  cascade : any;
  constructor(
    private groupService : GroupService,
    private userService : UserService,
    private fileBaseService : FileBaseService,
    public dialogRef: MdDialogRef<setMulJurisdictionDialog>,
    public toastr: ToastsManager,
    @Inject(MD_DIALOG_DATA) public data: any
  ){}
  cancel(){
    this.dialogRef.close(false);
  }
  ngOnInit() {
    this.data.pageSize = 50
    this.data.currentPage = 1
  }
  setJurisdiction(){
    let ids = []
    this.data.selected.forEach((item)=>{
      ids.push(item.r_object_id)
    })
    let params = Object.assign([], this.selectedList);
    params.forEach((item)=>{
      let arr = []
      arr.push(item['extendsPermitNames'])
      item['extendsPermitNames'] = arr.join('.')
    })
    this.loading = true
    this.fileBaseService.setMulJurisdiction(params,this.data.docbase,ids,this.cascade)
    this.dialogRef.close(true)

    // this.fileBaseService.setMulJurisdiction(params,this.data.docbase,ids,this.cascade).then(
    //   data => {
    //     this.loading = false
    //     this.dialogRef.close(true);
    //   },
    //   error => {
    //     this.loading = false
    //   }
    // )
  }
}

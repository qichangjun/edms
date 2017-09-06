import { Component,Inject,OnInit,AfterViewInit,ViewChild,ViewContainerRef,TemplateRef,Input,SimpleChange,OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../role.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

import { selectUserDialog } from '@fileBaseModule/dialog/selectUser/selectUser.dialog';


@Component({
  selector: 'role-info',
  templateUrl: './role-info.component.html',
  styleUrls: ['./role-info.component.scss']
})
export class RoleInfoComponent implements OnInit,AfterViewInit{
  @Input() currentRole : any;
  @Input() docbase : any;

  entity : any = {};
  loading : boolean = false;
  editStatus : boolean = false;
  constructor(
    public toastr: ToastsManager,
    private _roleService : RoleService,
    public MdDialogConfig : MdDialogConfig,
    public dialog: MdDialog,
    vcr: ViewContainerRef
  ) {}
  ngAfterViewInit(){}
  ngOnInit(){}
  updateRole(){
   this.loading = true;
   this._roleService.updateRole(this.entity,this.docbase).then(
     data => {
       this.loading = false;
       this.editStatus = false;
       this.getGroupInfo()
     },
     error => {
       this.loading = false;
     }
   )
  }

  getGroupInfo(){
    this.loading = true;
    this._roleService.getRoleInfo(this.currentRole.objectId,this.currentRole.objectName,this.docbase).then(
      data => {
        this.loading = false;
        this.editStatus = false;
        this.entity = data.roleInfo;
      },
      error => {
        this.loading = false;
      }
    )
  }

  selectUser(attrName){
    let conifg = new MdDialogConfig();
    conifg.data = {
      docbase : this.docbase,
      type : 'all'
    };
    conifg.height = 'auto';
    conifg.width = '600px';
    let dialogRef = this.dialog.open(selectUserDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.entity[attrName] = result[0].objectName
      }
    });
  }
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    if (changes['currentRole']) {
      if (changes['currentRole'].currentValue){
        if(this.currentRole.objectType == 'role'){
          this.getGroupInfo()
        }
      }
    }
  }
}

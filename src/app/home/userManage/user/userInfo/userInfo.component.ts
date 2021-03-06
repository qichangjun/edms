import { Component,Inject,OnInit,AfterViewInit,ViewChild,ViewContainerRef,TemplateRef,Input,SimpleChange,OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { FileBaseService,editMultipleDialog,selectUserDialog } from '@fileBaseModule/index';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit,AfterViewInit{
  @Input() currentUser : any;
  @Input() docbase : any;

  entity : any = {};
  loading : boolean = false;
  editStatus : boolean = false;
  constructor(
    public toastr: ToastsManager,
    private _userService : UserService,
    public MdDialogConfig : MdDialogConfig,
    public dialog: MdDialog,
    vcr: ViewContainerRef
  ) {}
  ngAfterViewInit(){}
  ngOnInit(){}
  updateUser(){
    this.loading = true;
    this._userService.updateUser(this.entity,this.docbase).then(
      data => {
        this.loading = false;
        this.editStatus = false
      },
      error => {
        this.loading = false
      }
    )
  }

  getUserInfo(){
    this.loading = true;
    this._userService.getUserInfo(this.currentUser.objectId,this.currentUser.objectName,this.docbase).then(
      data => {
        this.loading = false;
        this.editStatus = false;
        this.entity = data.userInfo
      },
      error => {
        this.loading = false
      }
    )
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    if (changes['currentUser']) {
      if (changes['currentUser'].currentValue){
        this.getUserInfo()
      }
    }
  }
}

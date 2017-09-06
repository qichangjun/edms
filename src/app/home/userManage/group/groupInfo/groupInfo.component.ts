import { Component,Inject,OnInit,AfterViewInit,ViewChild,ViewContainerRef,TemplateRef,Input,SimpleChange,OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../group.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

import { selectUserDialog } from '../../../fileBase/dialog/selectUser/selectUser.dialog';


@Component({
  selector: 'group-info',
  templateUrl: './group-info.component.html',
  styleUrls: ['./group-info.component.scss']
})
export class GroupInfoComponent implements OnInit,AfterViewInit{
  @Input() currentGroup : any;
  @Input() docbase : any;

  entity : any = {};
  loading : boolean = false;
  editStatus : boolean = false;
  constructor(
    public toastr: ToastsManager,
    private _groupService : GroupService,
    public MdDialogConfig : MdDialogConfig,
    public dialog: MdDialog,
    vcr: ViewContainerRef
  ) {}
  ngAfterViewInit(){}
  ngOnInit(){}
  updateGroup(){
    this.loading = true;
    this._groupService.updateGroup(this.entity,this.docbase).then(
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
    this._groupService.getGroupInfo(this.currentGroup.objectId,this.currentGroup.objectName,this.docbase).then(
      data => {
        this.loading = false;
        this.editStatus = false;
        this.entity = data.groupInfo
      },
      error => {
        this.loading = false
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
    if (changes['currentGroup']) {
      if (changes['currentGroup'].currentValue){
        if(this.currentGroup.objectType == 'group'){
          this.getGroupInfo()
        }
      }
    }
  }
}

import { Component,Inject,OnInit,AfterViewInit,ViewChild,ViewContainerRef,TemplateRef,Input,SimpleChange,OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../group.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';


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
  formData : any = {};
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
    this._groupService.updateGroup(this.formData,this.docbase).subscribe(
      data => {
        this.loading = false;
        let info = data.json();
        if (info.code==1) {
          this.editStatus = false;
          for(let key in this.formData){
            this.entity[key] = this.formData[key]
          };
          this.toastr.success(info.message);
        }else {
          this.toastr.error(info.message);
        }
      }
    )
  }
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    if (changes['currentGroup']) {
      if (changes['currentGroup'].currentValue){
        this.entity = changes['currentGroup'].currentValue;
        this.formData = Object.assign({}, changes['currentGroup'].currentValue)
      }
    }
  }
}

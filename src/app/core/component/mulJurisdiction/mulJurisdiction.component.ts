import { Component,OnInit,Input,OnChanges,SimpleChange,Output,EventEmitter,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
import { GroupService } from '@groupModule/group.service'
import { FormControl } from '@angular/forms';
import {Observable}  from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent'; 
import 'rxjs/add/operator/distinctUntilChanged';
import {UserService} from "@userModule/user.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'multi-jurisdiction',
  templateUrl: './mulJurisdiction.component.html',
  styleUrls: ['./mulJurisdiction.component.scss'],
})
export class MultiJurisdictionComponent implements OnInit,OnChanges,AfterViewInit{
  @Input() selectedList : any;
  @Input() type : string;
  @Input() selectType : string;
  @Input() docbase : string;
  objectType : string;
  rootName : string = '所有用户/组';
  ids : Array<any> = [];
  breadCrumbLists : Array<any> = [];
  rows : Array<any> = [];
  searchControl = new FormControl();
  currentPage : number = 1;
  totalElement : number = 0;
  keywords : string = '';
  constructor(
    private _groupService : GroupService,
    public toastr: ToastsManager,
    private _userService : UserService
  ) {}
  ngAfterViewInit(){}
  ngOnInit() {
    this.objectType = 'all'
    this.searchControl.valueChanges
      //.debounceTime(500)
      //.distinctUntilChanged()
      .subscribe(value => {
        this.currentPage = 1
        this.keywords = value
        if(this.ids.length == 0){
          this.searchList(value)
        }
      });
    this.searchList()
  }
  searchList(keyword?){
    let params = {pageSize : 50,currentPage : this.currentPage,docbase : this.docbase,keywords : keyword,objectType:this.objectType}
    this._groupService.getUserAndGroupList(params,this.docbase).then(
      data => {
        this.rows = data.userGroupList;
        this.totalElement = data.pageInfo.totalCount;
        this.selectedList.forEach((row)=>{
          if (row.objectId) {
            let selectedItem = this.rows.find((item)=>{
              return item['objectId'] == row.objectId
            });
            if (selectedItem){
              selectedItem['isChecked'] = true
            }
          }
        })
        this.ids = []
        this.breadCrumbLists = []
      }
    );
  }
  searchGroupChild(list){
    this._groupService.searchGroupChild(this.docbase,list.objectId).then(
      data => {
        this.currentPage = 1;
        this.rows = data.userList.concat(data.groupList);
        this.selectedList.forEach((row)=>{
          if (row.objectId) {
            let selectedItem = this.rows.find((item)=>{
              return item['objectId'] == row.objectId
            });
            if (selectedItem){
              selectedItem['isChecked'] = true
            }
          }
        })
      }
    );
  }

  changePage(event : number){
    this.currentPage = event
    this.searchList(this.keywords)
  }
  changeType(){
    this.currentPage = 1
    this.searchList(this.keywords)
  }

  selectRow(list){
    list.isChecked = !list.isChecked;
    if (list.isChecked){
      if (this.selectType != 'multiple') {
        this.selectedList = []
        this.rows.map((c)=>{
          c['isChecked'] = false
        })
        list.isChecked = true
      }
      list.extendsPermitNames = 'CHANGE_PERMIT'
      list.permitCode = '1'
      this.selectedList.push(list);
    } else{
      this.selectedList = this.selectedList.filter(c =>{
        return c.objectId != list.objectId
      })
    }
  }
  cancelRow(list){
    if (list.objectId){
      this.rows.find((row)=>{
        return row['objectId'] == list.objectId
      }).isChecked = false
    }
  }

  clickTreeOrBreadCrumb(event){
    this.currentPage = 1;
    if(event.ids.length == 1){
      this.ids = event.ids
      this.searchList(this.keywords)
    }else{
      for (let i = 0 ; i < this.ids.length;i++) {
        if (this.ids[i] == event.node.r_object_id) {
          this.ids.splice(i+1,this.ids.length - i);
          break;
        }
      }
      let list = {objectName : event.node.object_name,objectId:event.node.r_object_id}
      this.searchGroupChild(list)
    }
  }
  enterGroup(list){
    if(list.objectType == 'group'){
      if (this.ids[this.ids.length - 1] != list.objectId) {
        this.ids.push(list.objectId)
        this.breadCrumbLists.push({object_name:list.objectName,r_object_id:list.objectId})
        this.searchGroupChild(list)
      }
    }
  }
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = chng.currentValue;
    }
  }
}

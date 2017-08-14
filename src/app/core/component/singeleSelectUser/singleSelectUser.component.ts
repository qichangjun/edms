import { Component,OnInit,Input,OnChanges,SimpleChange,Output,EventEmitter,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
import { GroupService } from '../../../home/userManage/group/group.service'
import { FormControl } from '@angular/forms';
import {Observable}  from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import {UserService} from "../../../home/userManage/user/user.service";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'single-selectUser',
  templateUrl: './singleSelectUser.component.html',
  styleUrls: ['./singleSelectUser.component.scss'],
})
export class SingleSelectUsernComponent implements OnInit,OnChanges,AfterViewInit{
  @Input() selectedList : Array<any>;
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
    this._groupService.getUserAndGroupList(params,this.docbase).subscribe(
      data => {
        let info = data.json();
        if (info.code == 1) {
          this.rows = info.data.userGroupList;
          this.totalElement = info.data.pageInfo.totalCount;
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
        }else{
          this.toastr.error(info.message)
        }
      }
    );
  }
  searchGroupChild(list){
    this._groupService.searchGroupChild(this.docbase,list.objectId).subscribe(
      data => {
        let info = data.json();
        if (info.code == 1) {
          this.currentPage = 1;
          this.rows = info.data.userList.concat(info.data.groupList);
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
        }else{
          this.toastr.error(info.message)
        }
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
      this.rows.map((c)=>{
        c['isChecked'] = false
      });
      list.isChecked = true
      this.selectedList.splice(0,this.selectedList.length)
      this.selectedList.push(list);
    } else{
      this.selectedList = this.selectedList.filter(c =>{
        return c.objectId != list.objectId
      })
    }
  }

  clickTreeOrBreadCrumb(event){
    this.currentPage = 1;
    if(event.ids.length == 1){
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
    if (this.ids[this.ids.length - 1] != list.objectId) {
      this.ids.push(list.objectId)
      this.breadCrumbLists.push({object_name:list.objectName,r_object_id:list.objectId})
      this.searchGroupChild(list)
    }
  }
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = chng.currentValue;
    }
  }
}

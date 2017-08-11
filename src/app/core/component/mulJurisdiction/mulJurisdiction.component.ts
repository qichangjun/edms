import { Component,OnInit,Input,OnChanges,SimpleChange,Output,EventEmitter,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
import { GroupService } from '../../../home/userManage/group/group.service'
import { FormControl } from '@angular/forms';
import {Observable}  from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/distinctUntilChanged';
import {UserService} from "../../../home/userManage/user/user.service";

@Component({
  selector: 'multi-jurisdiction',
  templateUrl: './mulJurisdiction.component.html',
  styleUrls: ['./mulJurisdiction.component.scss'],
})
export class MultiJurisdictionComponent implements OnInit,OnChanges,AfterViewInit{
  @Input() selectedList : any;
  userList : any;
  groupList : any;
  @Input() type : string;
  @Input() selectType : string;
  searchControl = new FormControl();
  currentPage : number = 1;
  totalElement : number = 0;
  keywords : string;
  constructor(
    private _groupService : GroupService,
    private _userService : UserService
  ) {}
  ngAfterViewInit(){}
  ngOnInit() {
    this.searchControl.valueChanges
      //.debounceTime(500)
      //.distinctUntilChanged()
      .subscribe(value => {
        this.searchList(value)
      });
    this.searchList()
  }
  searchList(keyword?){
    let params = {pageSize : 50,currentPage : this.currentPage,docbase : 'wison_projects',keywords : keyword}
    this._groupService.getGroupList(params,true).subscribe(
      data => {
        let info = data.json();
        if (info.code == 1) {
          this.groupList = info.data.groupList;
          this.totalElement = info.data.page.totalCount;
          this.selectedList.forEach((row)=>{
            if (row.groupId) {
              this.groupList.filter((group)=>{
                return group['groupId'] == row.groupId
              })[0].isChecked = true
            }
          })
        }}
    );
  }
  selectRow(list){
    list.isChecked = !list.isChecked;
    if (list.isChecked){
      if (this.selectType != 'multiple') {
        this.selectedList = []
        this.groupList.map((c)=>{
          c['isChecked'] = false
        })
        this.userList.map((c)=>{
          c['isChecked'] = false
        })
        list.isChecked = true
      }
      list.extendsPermitNames = 'CHANGE_PERMIT'
      list.permitCode = 1
      this.selectedList.push(list);
    } else{
      this.selectedList = this.selectedList.filter(c =>{
        if (c.userId){
          return c.userId != list.userId
        }else{
          return c.groupId != list.groupId
        }
      })
    }
  }
  cancelRow(list){
    if (list.groupName){
      this.groupList.find((group)=>{
        return group['groupId'] == list.groupId
      }).isChecked = false
    }
    if(list.loginName){
      this.userList.find((user)=>{
        return user['userId'] == list.userId
      }).isChecked = false
    }
  }
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = chng.currentValue;
    }
  }
}

import { Component,Inject,OnInit,AfterViewInit,ViewChild,ViewContainerRef,TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { ConstantService } from '@commonService/constant.service';
import { EventService } from '@commonService/behavior.service';
import { GroupService } from './group.service'
import { UserService } from '@userModule/user.service';
import { selectUserDialog } from '@fileBaseModule/dialog/selectUser/selectUser.dialog';
import { RoleService } from '@roleModule/role.service';
import { removeRoleMemberDialog,addRoleMemberDialog } from '@roleModule/role.component';
import { reAssignDialog,checkUsersGroupDialog } from '@userModule/user.component';
import { reAssignRoleDialog,checkRoleParentDialog } from '@roleModule/role.component';

@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit,AfterViewInit{
  parameter : Parameter = {
    docbase : this.constantService.companyBase(),
    totalElements : 0,
    currentPage : 1,
    pageSize : 50,
    objectType : 'group',
    keywords : null
  };
  @ViewChild('gridList') gridList:any;
  @ViewChild('objectNameTmpl') objectNameTmpl: TemplateRef<any>;
  @ViewChild('translateHeaderTmpl') translateHeaderTmpl: TemplateRef<any>;

  @ViewChild('operaHeadTmpl') operaHeadTmpl: TemplateRef<any>;
  @ViewChild('checkboxTmpl') checkboxTmpl: TemplateRef<any>;
  @ViewChild('checkboxHeadTmpl') checkboxHeadTmpl: TemplateRef<any>;
  @ViewChild('configGridHeadTmpl') configGridHeadTmpl: TemplateRef<any>;
  @ViewChild('configGridTmpl') configGridTmpl: TemplateRef<any>;

  currentGroup : any = {};
  subscription : any;
  isLoading : boolean;
  selected : Array<any> = [];               //被选中的列数组
  columns : Array<any> = [];                //columns : 插件所用的列配置对象集合
  rows : Array<any> = [];                   //rows : 列数据
  pageLimit : number = 50;                  //pageLimit : 分页数
  localColumns : Array<any> = [];           //localColumns : 要存入localStorage的变量
  allColumns : Array<any> = [];             //allColumns : 显示隐藏列的配置菜单
  storageName : string = 'groupList';
  ids : Array<any> = [];
  breadCrumbLists : Array<any> = [];
  rootName : string = '所有用户/组';
  currentType : string;
  constructor(
    private _userService : UserService,
    private _groupService : GroupService,
    private _EventService : EventService,
    private router: Router,
    private route: ActivatedRoute,
    private constantService : ConstantService,
    public toastr: ToastsManager,
    public MdDialogConfig : MdDialogConfig,
    public _roleService : RoleService,
    public dialog: MdDialog
  ) {
    let _self = this
    //this.toastr.setRootViewContainerRef(vcr);
    this.route.queryParams.subscribe(params => {
      if (params['docbase'] && this.parameter.docbase != params['docbase']){
        this.parameter.docbase = params['docbase'];
        this.getList(true)
      }
      if (params['pageSize']) {
        this.parameter.pageSize = params['pageSize'] || 50;
      }
      if (params['currentPage']) {
        this.parameter.currentPage = Number(params['currentPage']) || 1;
      }
      if (this.parameter.keywords != params['keywords']) {
        this.parameter.keywords = params['keywords'] || '';
        this.getList(true)
      }
    });
    this.subscription = this._EventService.toggleEvent$.subscribe(bool => {
      setTimeout(function(){
        _self.gridList.datatable.onWindowResize();
      },500)
    });
  }
  ngAfterViewInit(){
  }
  ngOnInit(){
    this.getList(true)
  }
  uploadGrid(event){
    if(this.ids.length == 0){
      this.getList(event);
    }
  }
  getList(init : boolean){
    this.isLoading = true;
    if (init){
      this.selected = [];
    }
    this._userService.getUserList(this.parameter,init).then(
      data => {
        this.isLoading = false;
        this.loadColumns();
          this.breadCrumbLists = []
          this.parameter.totalElements = data.pageInfo.totalCount;
          this.parameter.currentPage = data.pageInfo.currentPage ;
          if (init) {
            this.rows = data.userGroupList
            setTimeout(() => {
              this.gridList.el.nativeElement.querySelector('datatable-body').scrollTop = 1
              this.gridList.el.nativeElement.querySelector('datatable-body').scrollLeft = 1
              if (this.rows.length > this.pageLimit) {
                this.gridList.datatable.offset = this.gridList.datatable.rowCount/this.gridList.datatable.pageSize;
                this.gridList.datatable.bodyComponent.updateOffsetY(this.gridList.datatable.offset);
              }
            });
          }else {
            this.rows = this.rows.concat(data.userGroupList);
          }
      },
      error => {
        this.isLoading = false
      }
    )
  }
  loadColumns(){
    /*
     加载本地保存的列配置,
     this.loacalColumns : 用于保存会便跟的本地配置
     this.columns : 列表真正使用的列配置(犹豫会被new成新的对象,所以无法直接存存储再localstorage中)
     this.allColumns : 用于管理显示及隐藏的列配置
     */
    let _self = this
    this.allColumns = [
      {name:'group_objectName',prop:'objectName',cellTemplate:this.objectNameTmpl,minWidth:100,hasTempl:true,headerTemplate:_self['translateHeaderTmpl']},
      {name:'description',prop:'description',minWidth:100,headerTemplate:_self['translateHeaderTmpl']},
      {name:'ownerName',prop:'ownerName',minWidth:100,headerTemplate:_self['translateHeaderTmpl']}
    ]
    this.columns = [
      {name:'',prop:'',cellTemplate:this.checkboxTmpl,headerTemplate:this.checkboxHeadTmpl,maxWidth:50,minWidth:50,width:50},
      {name:'group_objectName',prop:'objectName',cellTemplate:this.objectNameTmpl,headerTemplate:this.translateHeaderTmpl,minWidth:100,hasTempl:true},
      {name:'description',prop:'description',minWidth:100,headerTemplate:this.translateHeaderTmpl},
      {name:'',prop:'',cellTemplate:this.configGridTmpl,headerTemplate:this.configGridHeadTmpl,minWidth:80,resizeable:false}
    ];
    this.localColumns = JSON.parse(localStorage.getItem('grid_columns'+'_'+this.storageName));
    if (!this.localColumns){
      this.localColumns = [
        { prop:'objectName',minWidth:100,name:'group_objectName',hasTempl:true},
        { prop:'description',minWidth:100,name:'description'}
      ]
    }else{
      /*
       发现本地已有储存的配置,将loadColumns的各属性(width等.),顺序修改到this.columns中
       */
      this.columns = [
        { name:'',prop:'',cellTemplate:this.checkboxTmpl,headerTemplate:this.checkboxHeadTmpl,maxWidth:50,minWidth:50,width:50}
      ];
      for (let i = 0 ;i < this.localColumns.length; i ++) {
        this.columns[i + 1] = Object.assign({}, this.localColumns[i])
        this.columns[i + 1].headerTemplate = this.translateHeaderTmpl
        if (this.localColumns[i].hasTempl){
          this.columns[i + 1].cellTemplate = this[this.localColumns[i].prop + 'Tmpl']
        }
      }
      this.columns.push(
        { name:'',prop:'',cellTemplate:this.configGridTmpl,headerTemplate:this.configGridHeadTmpl,minWidth:80,resizeable:false}
      )
    }
  }
  toggle(col,index) {
    const isChecked = this.isChecked(col);
    if(isChecked) {
      this.columns = this.columns.filter(c => {
        return c.name !== col.name;
      });
      this.localColumns = this.localColumns.filter(c => {
        return c.prop !== col.prop;
      });
    } else {
      this.columns = [...this.columns];
      this.columns.splice(index + 1,0,col)
      this.localColumns = [...this.localColumns];
      this.localColumns.splice(index,0,{name:col.name,prop:col.prop,width:col.width,hasTempl:col.hasTempl})
    }
    localStorage.setItem('grid_columns'+'_'+this.storageName, JSON.stringify(this.localColumns));
  }
  isChecked(col) {
    return this.columns.find(c => {
      return c.name === col.name;
    });
  }

  enterGroup(row){
    if (this.ids[this.ids.length - 1] != row.objectId) {
      this.ids.push(row.objectId)
      this.breadCrumbLists.push({object_name:row.objectName,r_object_id:row.objectId,type:'group'})
      this.parameter.currentPage = 1
      this.currentType = 'group'
      this.searchGroupChild(row.objectId)
    }
  }

  enterRole(row){
    if (this.ids[this.ids.length - 1] != row.objectId) {
      this.ids.push(row.objectId)
      this.breadCrumbLists.push({object_name:row.objectName,r_object_id:row.objectId,type:'role'})
      this.parameter.currentPage = 1
      this.currentType = 'role'
      this.searchRoleChild(row.objectId)
    }
  }

  searchGroupChild(objectId){
    this._groupService.searchGroupChild(this.parameter.docbase,objectId).then(
      data => {
        this.selected = [];
        this.rows = data.userList.concat(data.groupList);
        this.parameter.totalElements = this.rows.length;
      },
      error => {
        return
      }
    );
  }

  searchRoleChild(objectId){
    this._roleService.searchRoleChild(this.parameter.docbase,objectId).then(
      data => {
        this.selected = [];
        this.rows = data.userList.concat(data.groupList);
        this.parameter.totalElements = this.rows.length;
      },
      error => {
        return
      }
    );
  }

  clickTreeOrBreadCrumb(event){
    if(event.ids.length == 1){
      this.ids = []
      this.getList(true)
    }else{
      for (let i = 0 ; i < this.ids.length;i++) {
        if (this.ids[i] == event.node.r_object_id) {
          this.ids.splice(i+1,this.ids.length - i);
          break;
        }
      }
      let list = {objectName : event.node.object_name,objectId:event.node.r_object_id}
      if (event.node.type == 'role') {
        this.currentType = 'role'
        this.searchRoleChild(list.objectId)
      }
      else{
        this.currentType = 'group'
        this.searchGroupChild(list.objectId)
      }
    }
  }

  createGroup(){
    let conifg = new MdDialogConfig();
    conifg.data = {
      docbase : this.parameter.docbase
    };
    conifg.height = 'auto';
    conifg.width = '600px';
    let dialogRef = this.dialog.open(createGroupDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(this.ids.length == 0){
          this.getList(true)
        }else{
          this.searchGroupChild(this.ids[this.ids.length - 1])
        }
      }
    });
  }
  removeGroup(row){
    let conifg = new MdDialogConfig();
    conifg.data = {
      docbase : this.parameter.docbase,
      row : row
    };
    conifg.height = 'auto';
    conifg.width = '600px';
    let dialogRef = this.dialog.open(removeGroupDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if(this.ids.length == 0){
          this.getList(true)
        }else{
          this.searchGroupChild(this.ids[this.ids.length - 1])
        }
      }
    });
  }

  removeMember(){
    let conifg = new MdDialogConfig();
    conifg.data = {
      docbase : this.parameter.docbase,
      selected : this.selected,
      targetId : this.ids[this.ids.length - 1]
    };
    conifg.height = 'auto';
    conifg.width = '600px';
    let dialogRef
    switch (this.currentType){
      case 'role':
        dialogRef = this.dialog.open(removeRoleMemberDialog,conifg);
        break;
      case 'group':
        dialogRef = this.dialog.open(removeMemberDialog,conifg);
        break;
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateList()
      }
    });
  }
  addMember(){
    let conifg = new MdDialogConfig();
    conifg.data = {
      docbase : this.parameter.docbase,
      targetId : this.ids[this.ids.length - 1],
      type : 'all'
    };
    conifg.height = 'auto';
    conifg.width = '800px';
    let dialogRef
    switch (this.currentType){
      case 'role':
        dialogRef = this.dialog.open(addRoleMemberDialog,conifg);
        break;
      case 'group':
        dialogRef = this.dialog.open(addMemberDialog,conifg);
        break;
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateList()
      }
    });
  }
  reAssign(){
    let conifg = new MdDialogConfig();
    conifg.data = {
      docbase : this.parameter.docbase,
      selected : this.selected
    };
    conifg.height = 'auto';
    conifg.width = '600px';
    let dialogRef
    switch (this.selected[0].objectType){
      case 'user':
        dialogRef = this.dialog.open(reAssignDialog,conifg);
        break;
      case 'role':
        dialogRef = this.dialog.open(reAssignRoleDialog,conifg);
        break;
      case 'group':
        dialogRef = this.dialog.open(reAssignGroupDialog,conifg);
        break;
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.updateList()
      }
    });
  }

  checkParent(){
    let conifg = new MdDialogConfig();
    conifg.data = {
      docbase : this.parameter.docbase,
      selected : this.selected
    };
    conifg.height = 'auto';
    conifg.width = '600px';
    let dialogRef
    switch (this.selected[0].objectType){
      case 'user':
        dialogRef = this.dialog.open(checkUsersGroupDialog,conifg);
        break;
      case 'role':
        dialogRef = this.dialog.open(checkRoleParentDialog,conifg);
        break;
      case 'group':
        dialogRef = this.dialog.open(checkGroupParentDialog,conifg);
        break;
    }
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        return
      }
    });
  }

  updateList(){
    if(this.ids.length == 0){
      this.getList(true)
    }else{
      if (this.currentType == 'role') {
        this.searchRoleChild(this.ids[this.ids.length - 1])
      }else{
        this.searchGroupChild(this.ids[this.ids.length - 1])
      }
    }
  }
}

export class Parameter {
  docbase : string;
  totalElements : number;
  currentPage : number;
  pageSize : number;
  objectType : string;
  keywords : string;
}

/**
 * 新建组
 * */
@Component({
  selector: 'create-group',
  templateUrl: './dialog/createGroup.dialog.html',
  styleUrls: ['./dialog/css/createGroup.dialog.scss'],
})
export class createGroupDialog implements OnInit{
  loading : boolean = false;
  ownerName : string = '';
  groupAdminName : string = ''
  constructor(
    public dialog: MdDialog,
    public toastr: ToastsManager,
    public dialogRef: MdDialogRef<createGroupDialog>,
    private _groupService : GroupService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
  }
  public entity : any = {};
  cancel(){
    this.dialogRef.close(false);
  }
  ngOnInit(){
    this.entity.docbase = this.data.docbase
  }
  createGroup(){
    this.loading = true;
    this._groupService.createGroup(this.entity).then(
      data => {
        this.loading = false;
        this.dialogRef.close(true);
      },
      error => {
        this.loading = false
      }
    )
  }

  selectUser(attrName){
    let conifg = new MdDialogConfig();
    conifg.data = {
      //attrValue : this.entity[attrName],
      docbase : this.data.docbase,
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
}

@Component({
  selector: 'remove-group',
  templateUrl: './dialog/removeGroup.dialog.html',
  styleUrls: ['./dialog/css/removeGroup.dialog.scss'],
})
export class removeGroupDialog implements OnInit{
  loading : boolean = false;
  constructor(
    public dialog: MdDialog,
    public toastr: ToastsManager,
    public dialogRef: MdDialogRef<removeGroupDialog>,
    private _groupService : GroupService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {}
  cancel(){
    this.dialogRef.close(false);
  }
  ngOnInit(){
    console.log(this.data)
  }
  removeGroup(){
    this.loading = true;
    console.log (111)
    this._groupService.removeGroup(this.data).then(
      data => {
        this.loading = false;
        this.dialogRef.close(true);
      },
      error => {
        this.loading = false;
      }
    )
  }
}

@Component({
  selector: 'remove-member',
  templateUrl: './dialog/removeMember.dialog.html',
  styleUrls: ['./dialog/css/removeGroup.dialog.scss'],
})
export class removeMemberDialog implements OnInit{
  loading : boolean = false;
  constructor(
    public dialog: MdDialog,
    public toastr: ToastsManager,
    public dialogRef: MdDialogRef<removeGroupDialog>,
    private _groupService : GroupService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {}
  cancel(){
    this.dialogRef.close(false);
  }
  ngOnInit(){
    console.log(this.data)
  }
  removeMember(){
    this.loading = true;
    this._groupService.removeMember(this.data).then(
      data => {
        this.loading = false;
        this.dialogRef.close(true);
      },
      error => {
        this.loading = false
      }
    )
  }
}

@Component({
  selector: 'add-member',
  templateUrl: './dialog/addMember.dialog.html',
  styleUrls: ['./dialog/css/removeGroup.dialog.scss'],
})
export class addMemberDialog implements OnInit{
  loading : boolean = false;
  selectedList : Array<any> = [];
  constructor(
    public dialog: MdDialog,
    public toastr: ToastsManager,
    public dialogRef: MdDialogRef<addMemberDialog>,
    private _groupService : GroupService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {}
  cancel(){
    this.dialogRef.close(false);
  }
  ngOnInit(){
    console.log(this.data)
  }
  addMember(){
    this.loading = true;
    this._groupService.addMember(this.data,this.selectedList).then(
      data => {
        this.loading = false;
        this.dialogRef.close(true);
      },
      error => {
        this.loading = false;
      }
    )
  }
}

@Component({
  selector: 're-assign-group',
  templateUrl: './dialog/reAssignGroup.dialog.html',
  styleUrls: ['./dialog/css/createGroup.dialog.scss'],
})
export class reAssignGroupDialog implements OnInit{
  loading : boolean = false;
  groupList : Array<any> = [];
  newUser : any = {};
  constructor(
    public dialog: MdDialog,
    public toastr: ToastsManager,
    public dialogRef: MdDialogRef<reAssignGroupDialog>,
    private _groupService : GroupService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {}
  cancel(){
    this.dialogRef.close(false);
  }
  ngOnInit(){}
  selectUser(){
    let conifg = new MdDialogConfig();
    conifg.data = {
      docbase : this.data.docbase,
      type : 'group'
    };
    conifg.height = '800px';
    conifg.width = '600px';
    let dialogRef = this.dialog.open(selectUserDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.newUser = result[0]
      }
    });
  }
  reAssignGroup(){
    this._groupService.reAssignGroup(this.data.selected[0],this.data.docbase,this.newUser.objectId).then(
      data => {
        this.loading = false;
        this.dialogRef.close(true);
      },
      error => {
        this.loading = false
      }
    )
  }
}

@Component({
  selector: 'check-group-parent',
  templateUrl: './dialog/checkGroupParent.dialog.html',
  styleUrls: ['./dialog/css/removeGroup.dialog.scss'],
})
export class checkGroupParentDialog implements OnInit{
  loading : boolean = false;
  groupList : Array<any> = [];
  constructor(
    public dialog: MdDialog,
    public toastr: ToastsManager,
    public dialogRef: MdDialogRef<checkGroupParentDialog>,
    private _groupService : GroupService,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {}
  cancel(){
    this.dialogRef.close(false);
  }
  ngOnInit(){
    this._groupService.checkGroupParent(this.data.selected[0],this.data.docbase).then(
      data => {
        this.loading = false;
        this.groupList = data.groupList
      },
      error => {
        this.loading = false;
      }
    )
  }
}


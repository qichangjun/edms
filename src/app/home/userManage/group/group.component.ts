import { Component,Inject,OnInit,AfterViewInit,ViewChild,ViewContainerRef,TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { ConstantService } from '../../../services/constant.service';
import { EventService } from '../../../services/behavior.service';
import { GroupService } from './group.service'

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
    pageSize : 50
  };
  @ViewChild('gridList') gridList:any;
  @ViewChild('groupNameTmpl') groupNameTmpl: TemplateRef<any>;

  @ViewChild('operaHeadTmpl') operaHeadTmpl: TemplateRef<any>;
  @ViewChild('checkboxTmpl') checkboxTmpl: TemplateRef<any>;
  @ViewChild('checkboxHeadTmpl') checkboxHeadTmpl: TemplateRef<any>;
  @ViewChild('configGridHeadTmpl') configGridHeadTmpl: TemplateRef<any>;
  @ViewChild('configGridTmpl') configGridTmpl: TemplateRef<any>;

  currentGroup : any;
  subscription : any;
  isLoading : boolean;
  selected : Array<any> = [];               //被选中的列数组
  columns : Array<any> = [];                //columns : 插件所用的列配置对象集合
  rows : Array<any> = [];                   //rows : 列数据
  pageLimit : number = 50;                  //pageLimit : 分页数
  localColumns : Array<any> = [];           //localColumns : 要存入localStorage的变量
  allColumns : Array<any> = [];             //allColumns : 显示隐藏列的配置菜单
  storageName : string = 'groupList';
  constructor(
    private _groupService : GroupService,
    private _EventService : EventService,
    private router: Router,
    private route: ActivatedRoute,
    private constantService : ConstantService,
    public toastr: ToastsManager,
    public MdDialogConfig : MdDialogConfig,
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
    this.getList(event);
  }
  getList(init : boolean){
    this.isLoading = true;
    if (init){
      this.selected = [];
    }
    this._groupService.getGroupList(this.parameter,init).subscribe(
      data => {
        this.isLoading = false;
        let info = data.json();
        if (info.code == 1) {
          this.loadColumns();
          this.parameter.totalElements = info.data.page.totalCount;
          this.parameter.currentPage = info.data.page.currentPage ;
          if (init) {
            this.rows = info.data.groupList
            setTimeout(() => {
              if (this.rows.length > this.pageLimit) {
                this.gridList.datatable.offset = this.gridList.datatable.rowCount/this.gridList.datatable.pageSize;
                this.gridList.datatable.bodyComponent.updateOffsetY(this.gridList.datatable.offset);
              }
            });
          }else {
            this.rows = this.rows.concat(info.data.groupList);
          }
        }
        else if (info.code ==0) {
          //this.router.navigate(['/login']);
          this.toastr.error(info.message);
        }
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
    this.allColumns = [
      {name:'组名',prop:'groupName',cellTemplate:this.groupNameTmpl,minWidth:100},
      {name:'描述',prop:'description',minWidth:100},
      {name:'拥有者',prop:'owner',minWidth:100}
    ]
    this.columns = [
      { name:'',prop:'',cellTemplate:this.checkboxTmpl,headerTemplate:this.checkboxHeadTmpl,maxWidth:50,minWidth:50,width:50},
      {name:'组名',prop:'groupName',cellTemplate:this.groupNameTmpl,minWidth:100},
      {name:'描述',prop:'description',minWidth:100},
      { name:'',prop:'',cellTemplate:this.configGridTmpl,headerTemplate:this.configGridHeadTmpl,minWidth:80,resizeable:false}
    ];
    this.localColumns = JSON.parse(localStorage.getItem('grid_columns'+'_'+this.storageName));
    if (!this.localColumns){
      this.localColumns = [
        { prop:'groupName',minWidth:100,name:'组名'},
        { prop:'description',minWidth:100,name:'描述'}
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
        if (this.localColumns[i].prop == 'groupName'){
          this.columns[i + 1].cellTemplate = this.groupNameTmpl
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
      this.localColumns.splice(index + 1,0,{name:col.name,prop:col.prop,width:col.width})
    }
    localStorage.setItem('grid_columns'+'_'+this.storageName, JSON.stringify(this.localColumns));
  }
  isChecked(col) {
    return this.columns.find(c => {
      return c.name === col.name;
    });
  }

  createGroup(){
    let conifg = new MdDialogConfig();
    conifg.data = {
      docbase : this.parameter.docbase
    };
    conifg.height = '400px';
    conifg.width = '600px';
    let dialogRef = this.dialog.open(createGroupDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getList(true)
      }
    });
  }
  removeGroup(row){
    let conifg = new MdDialogConfig();
    conifg.data = {
      docbase : this.parameter.docbase,
      row : row
    };
    conifg.height = '400px';
    conifg.width = '600px';
    let dialogRef = this.dialog.open(removeGroupDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getList(true)
      }
    });
  }
}

export class Parameter {
  docbase : string;
  totalElements : number;
  currentPage : number;
  pageSize : number;
}


/**
 * 新建文件柜
 * @params this.data={parentId:父文件夹Id}
 * @params attrLists:文件柜的属性
 * */
@Component({
  selector: 'create-group',
  templateUrl: './dialog/createGroup.dialog.html',
  styleUrls: ['./dialog/css/createGroup.dialog.scss'],
})
export class createGroupDialog implements OnInit{
  loading : boolean = false;
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
    this._groupService.createGroup(this.entity).subscribe(
      data => {
        this.loading = false;
        let info = data.json();
        if (info.code==1) {
          this.dialogRef.close(true);
          this.toastr.success(info.message);
        }else {
          this.toastr.error(info.message);
        }
      }
    )
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
    this._groupService.removeGroup(this.data).subscribe(
      data => {
        this.loading = false;
        let info = data.json();
        if (info.code==1) {
          this.dialogRef.close(true);
          this.toastr.success(info.message);
        }else {
          this.toastr.error(info.message);
        }
      }
    )
  }
}

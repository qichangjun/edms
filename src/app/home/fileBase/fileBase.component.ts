import { Component,Inject,OnInit,AfterViewInit,OnDestroy,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService,newFolderDialog,newFileCabinetDialog,editMultipleDialog,translateFileDialog,checkPositionDialog,removeFileDialog,setMulJurisdictionDialog,versionManageDialog,exportCurrFolderLimitsDialog,setMulProDialog,removeFileConfirmDialog } from './index';
import { FileSelectDirective, FileDropDirective, FileUploader,FileUploaderOptions } from 'ng2-file-upload/ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantService } from '@commonService/constant.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ResizeEvent } from 'angular-resizable-element';
import { EventService,hiddenChangeService } from '@commonService/behavior.service';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '@commonService/authentication.service';
import { ApiUrlService } from '@commonService/apiUrl.service';

import { slideInDownAnimation } from '@coreModule/animations/animations';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';
import { UserService } from '@userModule/user.service';
import { GroupService } from '@groupModule/group.service';

declare var Dropzone:any;

@Component({
  selector: 'file-base',
  templateUrl: './fileBase.component.html',
  styleUrls: ['./fileBase.component.scss'],
  animations: [trigger(
    'enterAnimation', [
      state('inactive',
        style({width: '0px'})
      ),
      state('active',
        style({width: '250px'})
      ),
      transition('inactive => active', animate('500ms ease-in',style({width: '250px'}))),
      transition('active => inactive', animate('500ms ease-out',style({width: '0px'})))
    ]
  )]
})
export class FileBaseComponent implements OnInit,AfterViewInit,OnDestroy{
  @ViewChild('myupload') myupload:any;
  @ViewChild('gridList') gridList:any;
  @ViewChild('objectNameTmpl') object_nameTmpl: TemplateRef<any>;
  @ViewChild('translateHeaderTmpl') translateHeaderTmpl: TemplateRef<any>;
  @ViewChild('r_full_content_sizeTmpl') r_full_content_sizeTmpl: TemplateRef<any>;
  @ViewChild('dateTmpl') dateTmpl: TemplateRef<any>;
  @ViewChild('operaHeadTmpl') operaHeadTmpl: TemplateRef<any>;
  @ViewChild('checkboxTmpl') checkboxTmpl: TemplateRef<any>;
  @ViewChild('checkboxHeadTmpl') checkboxHeadTmpl: TemplateRef<any>;
  @ViewChild('configGridHeadTmpl') configGridHeadTmpl: TemplateRef<any>;
  @ViewChild('configGridTmpl') configGridTmpl: TemplateRef<any>;
  @ViewChild('sidenav') sidenav: TemplateRef<any>;
  @ViewChild('fullPathTmpl') fullPathTmpl: TemplateRef<any>;
  @ViewChild('searchNameTmpl') searchNameTmpl: TemplateRef<any>;
  

  rootName : string;
  pathUrl : string;
  subscription : any;                       //事件传递,用于从最外层传递隐藏左侧树的广播
  ishiddenSubscription : any;
  langChangeSubscription : any;
  showTree : string = 'active';             //控制左侧树目录的显示隐藏动画
  parameter : Parameter = {                 //url上的参数
    ids :  [],                           //ids为树目录的路径
    pageSize : 50,
    currentPage : 1,
    totalElements : 1,
    dir : null,
    prop : null,
    docbase : null,
    type : 2,
    object_name : null,
    a_status : null,
    eee : null,
    keywords : null
  };
  enableSave : boolean = false;
  currentFileId : any;                      //选中的文档,用于右侧滑出栏
  selected : Array<any> = [];               //被选中的列数组
  storageName = 'fileBase';                 //storageName : 保存列配置的storage名
  columns : Array<any> = [];                //columns : 插件所用的列配置对象集合
  rows : Array<any> = [];                   //rows : 列数据
  editName : string;
  pageLimit : number = 50;                  //pageLimit : 分页数
  localColumns : Array<any> = [];           //localColumns : 要存入localStorage的变量
  allColumns : Array<any> = [];             //allColumns : 显示隐藏列的配置菜单
  breadCrumbLists : Array<any> = [];        //面包屑列数据
  treeData : Array<any>;                    //树目录数据
  currentNode : any = '0';                        //当前所在节点ID
  isLoading : boolean;                      //是否在加载中
  public zTreeWidth: any = '250px';         //左侧树目录默认宽度
  public uploader:FileUploader;
  constructor(
    public translate : TranslateService,
    private route: ActivatedRoute,
    private fileBaseService : FileBaseService,
    private router: Router,
    private _constantService  : ConstantService,
    public toastr: ToastsManager,
    private _EventService : EventService,
    private _hiddenChangeService : hiddenChangeService,
    public MdDialogConfig : MdDialogConfig,
    public dialog: MdDialog,
    private _authenticationService : AuthenticationService,
    private _apiUrlService : ApiUrlService
  ){
    
  }
  ngOnDestroy(){
    this.langChangeSubscription.unsubscribe()
    this.ishiddenSubscription.unsubscribe()
    this.subscription.unsubscribe()
  }
  
  ngAfterViewInit(){
    let self = this;
    this.langChangeSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {      
      this.initTranslate()
      this.getTreeData()
    });
    this.ishiddenSubscription = this._hiddenChangeService.toggleEvent$.subscribe(bool => {
      if (bool === false || bool === true) {
        this.getTreeData()
      }      
    });
    this.subscription = this._EventService.toggleEvent$.subscribe(bool => {
      if (bool.toString() == 'true'){
        self.zTreeWidth = '250px';
        self.myupload.nativeElement.style.width = self.myupload.nativeElement.parentElement.clientWidth - parseInt(self.zTreeWidth) + 'px';
        setTimeout(function(){
          self.gridList.datatable.onWindowResize();
        },500)
        self.showTree = 'active'
      }else if (bool.toString() == 'false') {
        self.showTree = 'inactive';
        setTimeout(function(){
          self.myupload.nativeElement.style.width = self.myupload.nativeElement.parentElement.clientWidth - 1  + 'px';
          setTimeout(function(){
            self.gridList.datatable.onWindowResize()
          },500)
        },500)
      }
    });
    window.onresize = function(){
      if (self.showTree == 'inactive') {
        setTimeout(function(){
          self.myupload.nativeElement.style.width = self.myupload.nativeElement.parentElement.clientWidth - 1  + 'px';
          self.gridList.datatable.onWindowResize()
        },500)
      }else{
          self.myupload.nativeElement.style.width = self.myupload.nativeElement.parentElement.clientWidth - 1 - parseInt(self.zTreeWidth) + 'px';
          self.gridList.datatable.onWindowResize();
      }
    }
  }
  ngOnInit(){
    this.initParameter();                               //获取路由上的参数\
    this.initTranslate()
    this.getTreeData();                                 //初始化树目录
  }
  openUploadWindow() {
    let navigationExtras: any = {
      outlets: {uploadFile: 'uploadFile'}
    };
    this.router.navigate([navigationExtras],{preserveQueryParams: true});
  }
  initUpload(){
    let _self = this;
    _self.uploader = new FileUploader({queueLimit:500,autoUpload:true,url: this._constantService.baseUrl() + this._apiUrlService.upload,
      additionalParameter: {
        accessToken : this._authenticationService.getCurrentUser().accessToken,
        accessUser : this._authenticationService.getCurrentUser().accessUser}});
    this.uploader.onAfterAddingAll = function(files){
      files.forEach((file)=>{
        file._file['parentId'] = _self.currentNode
      })
      _self.openUploadWindow()
      _self._EventService.toggleEvent({type:'select',value:_self.uploader})
    }
    this.uploader.onCompleteAll = function(){
      _self.getTreeData()
    }
    this.uploader.onBeforeUploadItem = (fileItem) =>{
      _self.uploader.options.additionalParameter['parentId'] = fileItem._file['parentId']
      _self.uploader.options.additionalParameter['fullPath'] = fileItem._file.webkitRelativePath || '/' + fileItem._file.name
      _self.uploader.options.additionalParameter['docbase'] = _self.parameter.docbase
    }
  }
  initParameter(){
    this.initUpload();
    this.route.url.subscribe(
      (data: any) => {
        for (let i of data) {
          if (i.path == 'fileBase'){
            this.pathUrl = this._constantService.companyBase()
            this.parameter.docbase = this._constantService.companyBase()
          }
          else {
            this.pathUrl = this._constantService.projectBase()
            this.parameter.docbase = this._constantService.projectBase()
          }
        }
    });
    this.route.queryParams.subscribe(params => {
      if (params['ids'] && params['ids'] != this.parameter.ids) {
        if (params['ids'] == '0' || params['ids'] == 0){
          this.parameter.ids = [0]
        }else {
          this.parameter.ids = params['ids'];
        }
        this.currentNode =  this.parameter.ids[this.parameter.ids.length - 1];
      }
      if (params['pageSize']) {
        this.parameter.pageSize = params['pageSize'] || 50;
      }
      if (params['currentPage']) {
        this.parameter.currentPage = Number(params['currentPage']) || 1;
      }
      if (params['object_name']) {
        this.parameter['object_name'] = params['object_name'];
      }
      if (params['totalElements']) {
        this.parameter['totalElements'] = params['totalElements'];
      }
      if (params['a_status']) {
        this.parameter['a_status'] = []
        params['a_status'].forEach((status)=>{
          this.parameter['a_status'].push(status)
        })
      }
      if (params['keywords']){
        if (this.parameter.keywords != params['keywords']) {
          this.parameter.keywords = params['keywords'] || '';
          this.getSearchList(true)
        }
      }      
    });
  }
  initTranslate(){
    this.translate.get([this.parameter.docbase,'statusTexts_title','on_build','waiting_for_close','is_filed']).subscribe((e)=>{
      this.rootName = e[this.parameter.docbase]
    })
  }
  getTreeData(){
    this.fileBaseService.getTreeDataPaths(this.parameter).then(
      data => {
        this.treeData = [{r_object_id:'0',object_name:this.rootName,isParent:true,r_object_type:'root'}]
          this.treeData = this.treeData.concat(data);
          for (let i = 0 ; i < this.treeData.length; i ++) {
            if (this.treeData[i].child_count > 0) {
              this.treeData[i].isParent = true
            }
            this.treeData[i].iconSkin=this.treeData[i].r_object_type
          }
          if (this.parameter.ids.length == 0) {
            if (this.treeData[0]) {
              this.parameter.ids.push(this.treeData[0].r_object_id);
              this.currentNode = this.treeData[0].r_object_id
              this.router.navigate([], { queryParams: {ids:this.parameter.ids} });
            }
          }
          if (!this.parameter.keywords){
            this.getBreadCrumb(this.parameter);
            this.getList(true);
          }          
      },
      error => {
        return 
      }
    )
  }
  getBreadCrumb(params){
    this.fileBaseService.getBreadCrumb(params).then(
      data => {
       this.breadCrumbLists = data;
      }
    );
  }
  getList(init : boolean){
    this.parameter.keywords = null;
    this.router.navigate([], { queryParams: this.parameter});
    this.isLoading = true;
    if (init){
      this.selected = [];
    }
    this.fileBaseService.getList(this.parameter,this.currentNode,init).then(
      data => {
        this.isLoading = false
        this.loadColumns();
        this.parameter.totalElements = data.totalCount;
        this.parameter.currentPage = data.currentPage ;
        if (init) {
          this.rows = data.resultSet
          setTimeout(() => {
            this.gridList.el.nativeElement.querySelector('datatable-body').scrollTop = 1
            this.gridList.el.nativeElement.querySelector('datatable-body').scrollLeft = 1
            if (this.rows.length > this.pageLimit) {
              this.gridList.datatable.offset = this.gridList.datatable.rowCount/this.gridList.datatable.pageSize;
              this.gridList.datatable.bodyComponent.updateOffsetY(this.gridList.datatable.offset);
            }
          });
        }else {
          this.rows = this.rows.concat(data.resultSet);
        }
      },
      error => {
        this.isLoading = false
      }
    )
  }
  getSearchList(init){    
    this.isLoading = true;
    this.fileBaseService.getCommonSearchList(this.parameter,this.currentNode,init).then(
      data=>{
        this.isLoading = false
        this.loadSearchColumns();
        this.parameter.totalElements = data.pageInfo.totalCount;
        this.parameter.currentPage = data.pageInfo.currentPage ;
        if (init) {
          this.rows = data.searchObjectList
          setTimeout(() => {
            this.gridList.el.nativeElement.querySelector('datatable-body').scrollTop = 1
            this.gridList.el.nativeElement.querySelector('datatable-body').scrollLeft = 1
            if (this.rows.length > this.pageLimit) {
              this.gridList.datatable.offset = this.gridList.datatable.rowCount/this.gridList.datatable.pageSize;
              this.gridList.datatable.bodyComponent.updateOffsetY(this.gridList.datatable.offset);
            }
          });
        }else {
          this.rows = this.rows.concat(data.searchObjectList);
        }
      },
      error=>{
        this.isLoading = false;
        return
      }
    )
  }
  enterFile(row){ 
    if (row.r_object_type != 'wison_prj_document' && row.r_object_type != 'wison_document') {
      if (this.parameter.ids[this.parameter.ids.length - 1] != row.r_object_id){
        this.parameter.ids.push(row.r_object_id);
        this.currentNode = this.parameter.ids[this.parameter.ids.length - 1];
        this.parameter.eee = row.r_object_id
        this.parameter.currentPage = 1
        this.router.navigate([], { queryParams: this.parameter });
        this.getBreadCrumb(this.parameter)        
        this.getList(true);
      }
    }else{
      let newWin = window.open('loading page');
      newWin.location.href = '/edms/#/previewDoc?docbase=' + 
      this.parameter.docbase + '&object_name=' + 
      row.object_name + '&r_object_id=' + 
      row.r_object_id + '&r_object_type=' + 
      row.r_object_type + '&contentType=' + 
      row.a_content_type
    }
  }
  
  findPath(row){
    this.fileBaseService.searchIdsByPosition(this.parameter,row.fullPath[0]).then(
      data => {
        let ids = ['0'];
        ids = ids.concat(data);
        this.parameter.ids = ids  
        this.parameter.keywords = null                
        this.router.navigate([], { queryParams: this.parameter});
        this.getTreeData()
      }
    )
  }

  loadSearchColumns(){
    this.enableSave = false
    this.columns = [
      {name:'',prop:'',headerTemplate:this.checkboxHeadTmpl,maxWidth:50,minWidth:50,width:50,cellTemplate:this.checkboxTmpl},
      {name:'object_name',prop:'objectName',headerTemplate:this.translateHeaderTmpl,minWidth:200,width:200,cellTemplate:this.searchNameTmpl},
      {name:'w_secret_level',prop:'secretLevel',headerTemplate:this.translateHeaderTmpl,minWidth:100},
      {name:'w_is_encrypted',prop:'isEncrypted',headerTemplate:this.translateHeaderTmpl,minWidth:100},      
      {name:'full_path',prop:'fullPath',headerTemplate:this.translateHeaderTmpl,minWidth:100,cellTemplate:this.fullPathTmpl}      
    ];
  }

  loadColumns(){
    /**
     *  加载本地保存的列配置,
     *  this.loacalColumns : 用于保存会便跟的本地配置
     *  this.columns : 列表真正使用的列配置(犹豫会被new成新的对象,所以无法直接存存储再localstorage中)
     *  this.allColumns : 用于管理显示及隐藏的列配置
    */
    this.enableSave = true
    this.allColumns = [
      {name:'w_secret_level',prop:'w_secret_level',minWidth:100,headerTemplate:this['translateHeaderTmpl']},
      {name:'w_is_encrypted',prop:'w_is_encrypted',minWidth:100,headerTemplate:this['translateHeaderTmpl']},
      {name:'w_file_count',prop:'w_file_count',minWidth:100,headerTemplate:this['translateHeaderTmpl']},
      {name:'r_full_content_size',prop:'r_full_content_size',minWidth:100,headerTemplate:this['translateHeaderTmpl'],hasTempl:true},
      {name:'r_version_label',prop:'r_version_label',minWidth:100,headerTemplate:this['translateHeaderTmpl']}
    ]
    this.columns = [
      {name:'',prop:'',headerTemplate:this.checkboxHeadTmpl,maxWidth:50,minWidth:50,width:50,cellTemplate:this.checkboxTmpl},
      {name:'object_name',prop:'object_name',headerTemplate:this.translateHeaderTmpl,minWidth:200,width:200,cellTemplate:this.object_nameTmpl},
      {name:'w_secret_level',prop:'w_secret_level',headerTemplate:this.translateHeaderTmpl,minWidth:100},
      {name:'w_is_encrypted',prop:'w_is_encrypted',headerTemplate:this.translateHeaderTmpl,minWidth:100},
      {name:'w_file_count',prop:'w_file_count',headerTemplate:this.translateHeaderTmpl,minWidth:100},
      {name:'r_full_content_size',prop:'r_full_content_size',headerTemplate:this.translateHeaderTmpl,minWidth:100,cellTemplate:this.r_full_content_sizeTmpl},
      {name:'r_version_label',prop:'r_version_label',headerTemplate:this.translateHeaderTmpl,minWidth:100},
      { name:'',prop:'',headerTemplate:this.configGridHeadTmpl,minWidth:80,resizeable:false,cellTemplate:this.configGridTmpl}
    ];
    this.localColumns = JSON.parse(localStorage.getItem('grid_columns'+'_'+this.storageName));
    if (!this.localColumns){
      this.localColumns = [
        { prop:'object_name',name:'object_name',minWidth:200,hasTempl:true},
        { prop:'w_secret_level',name:'w_secret_level',minWidth:100},
        { prop:'w_is_encrypted',name:'w_is_encrypted',minWidth:100},
        { prop:'w_file_count',name:'w_file_count',minWidth:100},
        { prop:'r_full_content_size',name:'r_full_content_size',minWidth:100,hasTempl:true},
        { prop:'r_version_label',name:'r_version_label',minWidth:100}
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

  //树目录,面包屑的点击事件
  activeRow(event){
    this.enterFile(event.row)
  }
  clickTreeOrBreadCrumb(event) {
    this.parameter.ids = event.ids;
    this.currentNode = this.parameter.ids[this.parameter.ids.length - 1];
    this.parameter.currentPage = 1
    this.router.navigate([], { queryParams: this.parameter });
    this.getBreadCrumb(this.parameter);
    this.getList(true);
  }
  uploadGrid(event){
    if (this.parameter.keywords){
      this.getSearchList(event);
    }else{
      this.getList(event);
    }
    
  }
  onResizeEnd(event: ResizeEvent): void {
    let _self = this
    let _width = event.rectangle.width
    if (event.rectangle.width > 400 ) {
      this.zTreeWidth = '400px'
      _width = 400
    }else if (event.rectangle.width < 250) {
      this.zTreeWidth = '250px'
      _width = 250
    }else{
      this.zTreeWidth = event.rectangle.width + 'px';
      _width = event.rectangle.width
    }
    this.myupload.nativeElement.style.width = this.myupload.nativeElement.offsetParent.clientWidth - _width - 15 + 'px'
    setTimeout(function(){
      _self.gridList.datatable.onWindowResize()
    },500)

  }

  search(){
    this.parameter.currentPage = 1
    this.router.navigate([], { queryParams: this.parameter });
    this.getList(true)
  }
  clearSearch(){
    this.parameter.object_name = ''
    this.parameter.currentPage = 1
    this.router.navigate([], { queryParams: this.parameter });
    this.getList(true)
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
      this.columns.splice(index + 2,0,col)
      this.localColumns = [...this.localColumns];
      this.localColumns.splice(index + 1,0,{name:col.name,prop:col.prop,width:col.width,hasTempl:col.hasTempl})
    }
    localStorage.setItem('grid_columns'+'_'+this.storageName, JSON.stringify(this.localColumns));
  }
  isChecked(col) {
    return this.columns.find(c => {
      return c.name === col.name;
    });
  }

  newFileCabinet(){
    let conifg = new MdDialogConfig();
    conifg.data = {
      parentId : this.currentNode,
      docbase : this.parameter.docbase
    };
    conifg.height = 'auto';
    conifg.width = '600px';
    let dialogRef = this.dialog.open(newFileCabinetDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTreeData();
      }
    });
  }
  newFolder(){ 
    let conifg = new MdDialogConfig();
    conifg.data = {
      parentId : this.currentNode,
      docbase : this.parameter.docbase
    };
    conifg.height = 'auto';
    conifg.width = '600px';
    let dialogRef = this.dialog.open(newFolderDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTreeData();
      }
    });
  }
  downloadFile(row?){
    let ids = []
    if (row) {
      ids.push(row.r_object_id)
    }else {
      this.selected.forEach(function(e){
        ids.push(e.r_object_id)
      })
    }
    this.fileBaseService.download(ids,this.parameter)
  }
  removeFile(row){
    let rows = []
    if (row) {
      rows.push(row)
    }else {
      this.selected.forEach((item)=>{
        rows.push(item)
      })
    }
    let selected = Object.assign([], rows);
    if (this.parameter.ids.length == 1) {
      let params = {ids:[],types:[]}
      selected.forEach((item)=>{
        params.ids.push(item.r_object_id)
        params.types.push(3)
      })
      let conifg = new MdDialogConfig();
      conifg.data = {
        docbase : this.parameter.docbase,
        parentId : this.currentNode,
        params : params
      };
      conifg.height = 'auto';
      conifg.width = '600px';
      let dialogRef = this.dialog.open(removeFileConfirmDialog,conifg);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getTreeData();
          return
        }
      });
    }else {
      let conifg = new MdDialogConfig();
      conifg.data = {
        docbase : this.parameter.docbase,
        parentId : this.currentNode,
        rows : selected
      };
      conifg.height = 'auto';
      conifg.width = '600px';
      let dialogRef = this.dialog.open(removeFileDialog,conifg);
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.getTreeData();
        }
      });
    }
  }

  changeName(ev){
    this.editName = ev.srcElement.value
  }

  translateFile(type){
    let conifg = new MdDialogConfig();
    conifg.data = {
      selected : this.selected,
      title : type,
      type : type,
      docbase : this.parameter.docbase,
      parentId : this.currentNode
    };
    conifg.height = 'auto';
    conifg.width = '600px';
    let dialogRef = this.dialog.open(translateFileDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTreeData();
      }
    });
  }
  checkPosition(){
    let conifg = new MdDialogConfig();
    conifg.data = {
      selected : this.selected,
      docbase : this.parameter.docbase
    };
    conifg.height = 'auto';
    conifg.width = '600px';
    let dialogRef = this.dialog.open(checkPositionDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      return
    });
  }
  versionManage(){
    let conifg = new MdDialogConfig();
    conifg.data = {
      selected : this.selected,
      docbase : this.parameter.docbase,
      parentId : this.currentNode
    };
    conifg.height = 'auto';
    conifg.width = '600px';
    let dialogRef = this.dialog.open(versionManageDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      this.getTreeData();
    });
  }
  setMulJurisdiction(){
    let conifg = new MdDialogConfig();
    conifg.data = {
      selected : this.selected,
      docbase : this.parameter.docbase
    };
    conifg.height = 'auto';
    conifg.width = '800px';
    let dialogRef = this.dialog.open(setMulJurisdictionDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getList(true);
      }
    });
  }
  exportCurrFolderLimits(){
    this.fileBaseService.exportLimits(this.parameter.docbase,this.selected,0,1)
  }
  setMulPro(){
    let conifg = new MdDialogConfig();
    conifg.data = {
      selected : this.selected,
      docbase : this.parameter.docbase
    };
    conifg.height = 'auto';
    conifg.width = '600px';
    let dialogRef = this.dialog.open(setMulProDialog,conifg);
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.getList(true)
      }      
    });
  }
}
export class Parameter {
  ids : Array<any>;
  pageSize : number;
  currentPage : number;
  totalElements : number;
  dir : string;
  prop : string;
  docbase : string;
  type : any;
  object_name : string;
  a_status : any;
  eee : string;
  keywords : string;
}

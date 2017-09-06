import { Component,OnInit,Input,AfterViewInit,Output,EventEmitter,OnChanges,SimpleChange } from '@angular/core';
import { ConstantService } from '@commonService/constant.service';
import { ApiUrlService } from '@commonService/apiUrl.service';
import { AuthenticationService } from '@commonService/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var jQuery:any;
declare var $ : any;
@Component({
  selector: 'ztree',
  templateUrl: './zTree.component.html',
  styleUrls: ['./zTree.component.scss']
})
export class ZTreeComponent implements OnInit{
  c_docItem : any;
  setting : any;
  zTreeObj : any;
  @Output() clickTree : EventEmitter<any> = new EventEmitter();
  @Input() docbase : string;
  @Input() treeId : any;
  @Input() idLists : any;
  @Input() treeData : any;
  @Input() currentNode : any = '0';
  constructor(
    private _constantService  : ConstantService,
    private  _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService,
    private _router : ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.setting = {
      treeId: this.treeId,
      data: {simpleData: {enable: true,pIdKey:'parent_id',idKey:'r_object_id'},key: {name: 'object_name'}},
      view: {addDiyDom: this.addDiyDom, selectedMulti: false},
      callback:{
        onClick : this.clickDom
        //zTreeBeforeAsync : function(treeId, treeNode){
        //  console.log(treeNode)
        //  return true
        //}
      },
      async:{
        enable: true,
        dataType:"json",
        type : "get",
        url : this._constantService.baseUrl() + this._apiUrlService['getTreeDataPaths'],
        dataFilter: this.ajaxDataFilter,
        autoParam:["r_object_id=ids"],
        otherParam: {
          docbase : this.docbase,
          accessToken : JSON.parse(localStorage.getItem('currentUserToken')).accessToken,
          accessUser : JSON.parse(localStorage.getItem('currentUserToken')).accessUser,
          column : 'object_name',
          direction : 'asc'
        }
      }
    };
  }
  addDiyDom =(treeId, treeNode) =>{
    let spaceWidth = 18;
    let switchObj = jQuery("#" + treeNode.tId + "_switch");
    let icoObj = jQuery("#" + treeNode.tId + "_ico");
    switchObj.remove();
    icoObj.before(switchObj);
    let spaceStr = "<span class='ztree-gap' style='width:" + (spaceWidth * treeNode.level)+ "px'></span>";
    switchObj.before(spaceStr);
  };
  clickDom  = (event, treeId, treeNode) => {
    console.log(treeId,treeNode)
    let self = this
    setTimeout(function(){
      self.zTreeObj.expandNode(treeNode, true, false, true);
      self.zTreeObj.selectNode(treeNode);
    },10)

    var nodes = this.zTreeObj.getSelectedNodes();
    if (nodes.length>0) {
      this.zTreeObj.reAsyncChildNodes(nodes[0], "refresh");
    }
    let generateTreeNodeIds = (treeNode)=> {
      let treeNodeIds=[];
      treeNodeIds.unshift(treeNode.r_object_id);
      let getTreeNodeIds=(treeNode)=> {
        let parentNode=treeNode.getParentNode();
        if (!parentNode) {
          treeNodeIds.unshift(treeNode.r_object_id);
          return
        }
        treeNodeIds.unshift(parentNode.r_object_id);
        getTreeNodeIds(parentNode)
      };
      getTreeNodeIds(treeNode);
      treeNodeIds.shift();
      return treeNodeIds
    };
    this.clickTree.emit({ids:generateTreeNodeIds(treeNode),node:treeNode});
  };
  ajaxDataFilter = (treeId, parentNode, res) => {
    if (res.code == '1') {
      let c_docTreeData=[];
      for (let i = 0; i < res.data.length ; i++) {
        this.c_docItem={
          r_object_type:res.data[i].r_object_type,
          r_object_id:res.data[i].r_object_id,
          parent_id:res.data[i].parent_id,
          object_name:res.data[i].object_name,
          isParent:(res.data[i].child_count > 0)
        };
        this.c_docItem.iconSkin=this.c_docItem.r_object_type
        c_docTreeData.push(this.c_docItem);
      }
      return c_docTreeData
    }
  };
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    if (changes['treeData']) {
      if (this.idLists) {
        if (this.idLists.length == 1) {
          if (this.treeData) {
            this.zTreeObj = $.fn.zTree.init(jQuery('#' + this.treeId),this.setting,this.treeData);
            let _expandId = this.treeData[0].r_object_id;
            let treeNode = this.zTreeObj.getNodeByParam("r_object_id", _expandId, null);
            if (treeNode) {
              this.zTreeObj.expandNode(treeNode, true, false, true);
              this.zTreeObj.selectNode(treeNode);
            }
          }
        }
        else {
          this.zTreeObj = $.fn.zTree.init(jQuery('#' + this.treeId),this.setting,this.treeData);
          let _expandId = this.idLists[this.idLists.length - 1];
          let treeNode = this.zTreeObj.getNodeByParam("r_object_id", _expandId, null);
          if (treeNode) {
            this.zTreeObj.expandNode(treeNode, true, false, true);
            this.zTreeObj.selectNode(treeNode);
          }
        }
      }
    }
    if (changes['currentNode']) {
      if (this.currentNode || this.currentNode == 0) {
        this.zTreeObj = $.fn.zTree.getZTreeObj(this.treeId);
        let _expandId = this.currentNode;
        if (this.zTreeObj){
          let treeNode = this.zTreeObj.getNodeByParam("r_object_id", _expandId, null);
          if (treeNode) {
            this.zTreeObj.expandNode(treeNode, true, false, true);
            this.zTreeObj.selectNode(treeNode);
          }
        }
      }
    }
  }
}

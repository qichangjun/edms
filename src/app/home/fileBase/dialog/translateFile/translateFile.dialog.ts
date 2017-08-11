import { Component,Inject,OnInit,AfterViewInit,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService } from '../../index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';

/**
 * 复制,链接,移动组件
 * @params this.data={title:显示标题(复制,链接,移动),selected:所选列,type:操作类型(复制,链接,移动)}
 * @params currentNode:选中的文件夹Id
 * @function clickTreeOrBreadCrumb:树目录点击响应事件
 * @getTreeData 初始化树目录
 * */
@Component({
  selector: 'translate-file',
  templateUrl: './translate-file.html',
})
export class translateFileDialog implements OnInit{
  title : string;
  loading : boolean = false;
  treeData : Array<any>;
  currentNode : any;
  ids : Array<any>;
  constructor(
    private fileBaseService : FileBaseService,
    public dialogRef: MdDialogRef<translateFileDialog>,
    public toastr: ToastsManager,
    @Inject(MD_DIALOG_DATA) public data: any
  ){}
  cancel(){
    this.dialogRef.close(false);
  }
  ngOnInit() {
    this.ids = [0];
    this.getTreeData();
    this.title = this.data.title;
    this.data.ids = [0]
  }
  clickTreeOrBreadCrumb(event){
    this.currentNode = event.node.r_object_id
  }
  getTreeData(){
    this.loading = true;
    this.data.ids = [0]
    this.fileBaseService.getTreeDataPaths(this.data).subscribe(
      data => {
        this.loading = false;
        let info = data.json();
        if (info.code == 1) {
          this.treeData = info.data;
          for (let i = 0 ; i < this.treeData.length; i ++) {
            if (this.treeData[i].child_count > 0) {
              this.treeData[i].isParent = true
            }
          }
          //获取树目录的数据,若是第一层,则自动打开第一层目录
          if (info.data[0]) {
            this.currentNode = info.data[0].r_object_id
          }
        }
      }
    )
  }
  translateTo(){
    this.loading = true;
    this.fileBaseService.translateFile(this.currentNode,this.data).subscribe(
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
    );
  }
}

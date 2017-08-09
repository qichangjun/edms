/**
 * Created by zzd on 17/7/14.
 */
import { Component,OnInit,HostBinding,Input,OnChanges,SimpleChange,Output,EventEmitter,ViewChild,TemplateRef,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'grid-list',
  templateUrl: './gridList.component.html',
  styleUrls: ['./gridList.component.scss'],
})
export class GridListComponent implements OnInit{
  @Input() rows : Array<any> = [];
  @Input() columns : Array<any>;
  @Input() localColumns : Array<any>;       //用于加载,保存本地localstorage中的列配置
  @Input() parameter : any;
  @Input() isLoading : boolean = false;
  @Input() storageName : string;

  @Output() uploadGrid : EventEmitter<any> = new EventEmitter();

  @ViewChild('datatable') datatable:any;

  @Input() selected : Array<any> = [];
  /**
   * 列表的表头高度
   * @type {number}
   * 每一列的高度
   * @type {number}
   * 每页的数量
   * @type {number}
   */
  headerHeight : number = 45;
  rowHeight : number = 40;
  pageLimit : number = 50;
  offsetX : number = 0;
  constructor(
    private router: Router,
    private el: ElementRef
  ) {}
  ngOnInit(){}
  reOrder(orderInfo){
    this.localColumns = this.swap(this.localColumns,orderInfo.prevValue -1 ,orderInfo.newValue - 1)
    localStorage.setItem('grid_columns'+'_'+this.storageName, JSON.stringify(this.localColumns));
  }
  reSize(reSizeInfo){
    for (let i = 0;i < this.localColumns.length; i ++) {
      if (reSizeInfo.column.prop == this.localColumns[i].prop) {
        this.localColumns[i].width = reSizeInfo.newValue
      }
    }
    localStorage.setItem('grid_columns'+'_'+this.storageName, JSON.stringify(this.localColumns));
  }
  onScroll(offsetY: number){
    const viewHeight = this.el.nativeElement.getBoundingClientRect().height - this.headerHeight;
    if (offsetY > 100) {
      this.parameter.currentPage = Math.ceil((viewHeight + offsetY) / (this.rowHeight * this.pageLimit));
    }
    this.router.navigate([], { queryParams: this.parameter });
    if (this.rows.length < this.parameter.totalElements && !this.isLoading && offsetY + viewHeight >= this.rows.length * this.rowHeight) {
      this.uploadGrid.emit(false);
    }
  }
  swap(arr,first,second){
    let tmp = arr[second];
    arr[second] = arr[first];
    arr[first] = tmp;
    return arr;
  }
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  onSort(event) {
    // event was triggered, start sort sequence
    this.parameter.dir = event.sorts[0].dir;
    this.parameter.prop = event.sorts[0].prop;
    this.router.navigate([], { queryParams: this.parameter });
    this.uploadGrid.emit(true);
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = chng.currentValue;
    }
  }
}

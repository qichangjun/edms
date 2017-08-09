import { Component,OnInit,Input,OnChanges,SimpleChange,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'multi-select-board',
  templateUrl: './multiSelectBoard.component.html',
  styleUrls: ['./multiSelectBoard.component.scss'],
})
export class MultiSelectBoardComponent implements OnInit,OnChanges{
  @Input() selectList : any;
  constructor() {}
  ngOnInit(){}
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    for (let propName in changes) {
      let chng = changes[propName];
      let cur  = chng.currentValue;
    }
  }
  selectedRow(list){
    if (list.isSelected){
      list.isSelected = !list.isSelected;
      return
    }
    for (let i in this.selectList){
      this.selectList[i].isSelected = false
    }
    list.isSelected = true
  }
  toUp(){
    for (let i = 0;i < this.selectList.length; i++){
      if (this.selectList[i].isSelected){
        for (let x = i - 1;x >= 0; x--){
          if (this.selectList[x].isChecked){
            this.selectList = this.swap(this.selectList,i,x)
            return
          }
        }
      }
    }
  }
  toDown(){
    for (let i = 0;i < this.selectList.length; i++){
      if (this.selectList[i].isSelected){
        for (let x = i+1;x < this.selectList.length; x++){
          if (this.selectList[x].isChecked){
            this.selectList = this.swap(this.selectList,i,x)
            return
          }
        }
      }
    }
  }
  swap(arr : any,first : number,second : number){
    let tmp = arr[second];
    arr[second] = arr[first];
    arr[first] = tmp;
    return arr;
  }
}

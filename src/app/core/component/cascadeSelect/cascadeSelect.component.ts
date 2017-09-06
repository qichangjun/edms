import { Component,OnInit,Input,OnChanges,SimpleChange,Output,EventEmitter } from '@angular/core';

@Component({
    selector: 'cascade-select',
    templateUrl: './cascadeSelect.component.html',
    styleUrls: ['./cascadeSelect.component.scss']
})
export class CascadeSelectComponent implements OnInit {
    @Input() attrLists : Array<any>;
    @Input() selectLists : Array<any>;
    @Input() selectType? : string = 'single';
    groupLists : Array<any> = [];
    currentGroup : any = {};
    constructor() { }

    isChecked(list){
        return this.selectLists.indexOf(list) >= 0
    }

    selectRow(list){
        if (this.selectLists.indexOf(list) < 0) {
            if (this.selectType == 'single'){
                this.selectLists.splice(0,this.selectLists.length)
                this.selectLists.push(list)
            }else{
                this.selectLists.push(list)
            }
        }
    }

    removeRow(list){
        if (this.selectLists.indexOf(list) >= 0) {
            this.selectLists.splice(this.selectLists.indexOf(list),1)
        }
    }

    ngOnInit() { 
        for(var key in this.attrLists){             
            this.groupLists.push(
                {
                    name : key,
                    children : this.attrLists[key]
                }
            )
        }
    }
}
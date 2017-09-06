import { Component,Inject,OnInit,AfterViewInit,HostBinding,TemplateRef,ViewChild,ViewContainerRef,ElementRef, trigger, transition, style, animate,state } from '@angular/core';
import { FileBaseService } from '../../index';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MdDialog, MdDialogRef,MdDialogConfig } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';
import { TranslateService,LangChangeEvent } from '@ngx-translate/core';

@Component({
    selector: 'input-multiple',
    templateUrl: './inputMultiple.dialog.html',
    styleUrls: ['./inputMultiple.dialog.scss']
})
export class inputMultipleDialog implements OnInit {
    keyValue : string;
    valueLists : Array<any> = [];
    currentValue : any;
    loading : boolean = false;
    constructor(
      public dialogRef: MdDialogRef<inputMultipleDialog>,
      @Inject(MD_DIALOG_DATA) public data: any
    ){}

    ngOnInit() { 
        this.valueLists = Object.assign([], this.data.attr.attrValues)
    }

    addValue(){
        if (this.valueLists.indexOf(this.keyValue) < 0) {
            this.valueLists.push(this.keyValue)
            this.keyValue = ''
        }
    }
    editValue(){
        this.valueLists.splice(this.valueLists.indexOf(this.currentValue),1);
        this.keyValue = this.currentValue;
    }
    deleteValue(){
        this.valueLists.splice(this.valueLists.indexOf(this.currentValue),1);
    }
    setProperty(){
        this.dialogRef.close(this.valueLists);
    }
}
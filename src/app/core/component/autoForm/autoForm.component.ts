import { Component, Input,OnInit } from '@angular/core';
import { FormGroup }        from '@angular/forms';

@Component({
    selector: 'auto-form',
    templateUrl: './autoForm.component.html',
    styleUrls: ['./autoForm.component.scss']
})
export class AutoFormComponent implements OnInit {
    @Input() form;
    @Input() attr: any;
    constructor() { 
        
    }
    get isValid() { return (this.form.controls[this.attr.attrName].errors.required && (this.form.dirty)); }
    ngOnInit(){        
        console.log(this.form,this.attr.attrName)
    }
}
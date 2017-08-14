import { Directive, ElementRef, Input,HostListener,OnInit,OnChanges,SimpleChange } from '@angular/core';
@Directive({ selector: '[shakingAnimation]' })
export class ShakingAnimationDirective implements OnInit,OnChanges{
  @Input() showErrorMessage: boolean;
  constructor(private el: ElementRef) {}
  ngOnInit(){
    console.log('shakingAnimation')
  }
  ngOnChanges(changes: {[propertyName: string]: SimpleChange}){
    if (changes['showErrorMessage']) {
      if(this.showErrorMessage == true){
        console.log(this.el)
      }
    }
  }
}

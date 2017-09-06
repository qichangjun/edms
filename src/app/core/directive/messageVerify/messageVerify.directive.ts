import { Directive, ElementRef, Input,HostListener,OnInit } from '@angular/core';
@Directive({ selector: '[messageVerify]' })
export class MessageVerifyDirective implements OnInit{
  @Input() elementName: string;
  constructor(private el: ElementRef) {}
  ngOnInit(){
    if (this.el.nativeElement.parentElement.querySelector("#"+this.elementName)){
      this.el.nativeElement.style.left = this.el.nativeElement.parentElement.querySelector("#"+this.elementName).clientWidth / 2 + 'px';
    }
    
  }
}

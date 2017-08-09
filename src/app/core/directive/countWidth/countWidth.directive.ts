import { Directive, ElementRef, Input,HostListener,OnInit } from '@angular/core';
@Directive({ selector: '[countWidth]' })
export class CountWidthDirective implements OnInit{
  @Input() elementName: string;
  constructor(private el: ElementRef) {}
  ngOnInit(){
    this.el.nativeElement.querySelector('.object_name').style.width = this.el.nativeElement.parentElement.parentElement.clientWidth - 60 + 'px'
    console.log(this.el.nativeElement.parentElement.parentElement.clientWidth)
    //console.log(this.el.nativeElement.querySelector('.operation-tool').clientWidth)
  }
}

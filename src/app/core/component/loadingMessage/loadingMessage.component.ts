import { Component,OnInit,Input,OnChanges,SimpleChange,Output,EventEmitter,ElementRef } from '@angular/core';

@Component({
  selector: 'loading-message',
  templateUrl: './loadingMessage.component.html',
  styleUrls: ['./loadingMessage.component.scss'],
})
export class LoadingMessageComponent implements OnInit{
  @Input() message : string;
  constructor(private el: ElementRef) {}

  ngOnInit(){
  }
}

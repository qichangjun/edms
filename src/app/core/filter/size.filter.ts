import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sizefilter'
})
export class Sizefilter implements PipeTransform {
  transform(bytes : any): string{
    if (bytes==0 || !bytes){
      return '0 B'
    }
    let k = 1024
    let sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i : number = Math.floor(Math.log(bytes) / Math.log(k));
    let size : any = Math.floor(bytes / Math.pow(k, i))
    return  size + ' ' + sizes[i];
  }
}

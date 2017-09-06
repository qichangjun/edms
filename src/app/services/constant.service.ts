import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

@Injectable()
export class ConstantService {
  constructor() { }
  baseUrl() {
    return environment.baseUrl;
  }

  previewUrl(){
    return environment.previewUrl;
  }
  companyBase(){
    return environment.companyBase;
  }
  projectBase(){
    return environment.projectBase;
  }
  hrefList(){
    return environment.mainHref;
  }
  docIdsLInk(){
    return environment.docIdsLInk;
  }
}

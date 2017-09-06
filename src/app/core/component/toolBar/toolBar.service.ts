import { Injectable } from '@angular/core';
import { Http, Headers, Response,URLSearchParams,RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConstantService } from '@commonService/constant.service'
import { ApiUrlService } from '@commonService/apiUrl.service'
import { AuthenticationService } from '@commonService/authentication.service'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class ToolBarService {
  constructor(
    private http : Http,
    private _constantService  : ConstantService,
    private  _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService
  ) {}
  getShowObJ(docbase : string) {
    let queryUrl =
      '?docbase=' + docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage();
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getShowObJ'] + queryUrl);
  }

  changeShowObJ(docbase : string,showObj : any) {
    let queryUrl =
      '?docbase=' + docbase +
      '&isHidden=' +  showObj +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage();
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['changeShowObJ'] + queryUrl);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}


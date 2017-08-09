import { Injectable } from '@angular/core';
import { Http, Headers, Response,URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConstantService } from './constant.service'
import { ApiUrlService } from './apiUrl.service'
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  constructor(
    private http : Http,
    private _constantService  : ConstantService,
    private  _apiUrlService : ApiUrlService
  ) { }

  login(username: string, password: string,language : string ) {
    let queryUrl =
      '?loginName=' + username +
      '&password=' + password +
      '&locale=' + language;
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['loginApi'] + queryUrl);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUserToken');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUserToken'))
  }
  getCurrentLanguage() {
    return localStorage.getItem('currentLanguage')
  }

}

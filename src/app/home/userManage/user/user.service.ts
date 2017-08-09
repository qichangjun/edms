import { Injectable } from '@angular/core';
import { Http, Headers, Response,URLSearchParams,RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConstantService } from '../../../services/constant.service'
import { ApiUrlService } from '../../../services/apiUrl.service'
import { AuthenticationService } from '../../../services/authentication.service'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class UserService {
  constructor(
    private http : Http,
    private _constantService  : ConstantService,
    private  _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService
  ) {}
  getUserList(parameters,init){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let info = Object.assign({}, parameters);
    if (init){
      info.pageSize = parameters.currentPage * parameters.pageSize
      info.currentPage = 1
    }
    let params = {orders:[],columns:[]}
    let orders = [];
    if(parameters.dir && parameters.prop){
      orders.push({direction:parameters.dir,column:parameters.prop})
      params.orders = orders
    }
    let columns = [];
    if (parameters.keywords){
      columns.push({name : 'loginName',predicate : 'LIKE',type : 'string',value : parameters.keywords});
      columns.push({name : 'userName',predicate : 'LIKE',type : 'string',value : parameters.keywords});
      params.columns = columns
    }
    let queryUrl =
      '?docbase=' + parameters.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&pageSize=' + info.pageSize +
      '&currentPage=' + info.currentPage;
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['getUserList'] + queryUrl,JSON.stringify(params),{headers:headers});
  }

  createUser(parameters:any) {
    let info = Object.assign({}, parameters)
    let params: URLSearchParams = new URLSearchParams();
    for(let key in info){
      params.set(key.toString(), info[key]);
    };
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['createUser'],{search: params})
  }
  removeUser(parameters:any) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',parameters.docbase);
    params.set('userId',parameters.row.userId);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['removeUser'],{search: params})
  }
  updateUser(parameters:any,docbase : string) {
    let info = Object.assign({}, parameters)
    let params: URLSearchParams = new URLSearchParams();
    for(let key in info){
      params.set(key.toString(), info[key]);
    };
    params.set('docbase',docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['updateUser'],{search: params})
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}


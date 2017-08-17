import { Injectable } from '@angular/core';
import { Http, Headers, Response,URLSearchParams,RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConstantService } from '../../../services/constant.service'
import { ApiUrlService } from '../../../services/apiUrl.service'
import { AuthenticationService } from '../../../services/authentication.service'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class GroupService {
  constructor(
    private http : Http,
    private _constantService  : ConstantService,
    private  _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService
  ) {}
  getGroupList(parameters,init){
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
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['getGroupList'] + queryUrl,JSON.stringify(params),{headers:headers});
  }
  createGroup(parameters:any) {
    let info = Object.assign({}, parameters)
    let params: URLSearchParams = new URLSearchParams();
    for(let key in info){
      params.set(key.toString(), info[key]);
    };
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['createGroup'],{search: params})
  }
  updateGroup(parameters:any,docbase : string) {
    let info = Object.assign({}, parameters)
    let params: URLSearchParams = new URLSearchParams();
    for(let key in info){
      params.set(key.toString(), info[key]);
    };
    params.set('docbase',docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['updateGroup'],{search: params})
  }

  removeGroup(parameters:any) {
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',parameters.docbase);
    params.set('groupId',parameters.row.objectId);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['removeGroup'],{search: params})
  }

  removeMember(parameters:any) {
    let ids = []
    parameters.selected.forEach((c)=>{
      ids.push(c.objectId)
    })
    let queryUrl =
      '?docbase=' + parameters.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&memberIds=' + ids +
      '&groupId=' + parameters.groupId;
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['removeMember'] + queryUrl)
  }

  addMember(parameters:any,selectedList : Array<any>) {
    let ids = []
    selectedList.forEach((c)=>{
      ids.push(c.objectId)
    })
    let queryUrl =
      '?docbase=' + parameters.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&memberIds=' + ids +
      '&groupId=' + parameters.groupId;
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['addMember'] + queryUrl)
  }

  getUserAndGroupList(parameters,docbase,groupId?){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let info = Object.assign({}, parameters);
    info.keywords = info.keywords || ''
    let params = {orders:[],page:1,length:50}
    if(parameters.dir && parameters.prop){
      params.orders.push({direction:parameters.dir,column:parameters.prop})
    }
    params.page = info.currentPage;
    params.length = info.pageSize;
    let queryUrl =
      '?docbase=' + parameters.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&keywords=' + info.keywords +
      '&objectType=' + info.objectType;
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['getUserAndGroupList'] + queryUrl,JSON.stringify(params),{headers:headers});

  }

  searchGroupChild(docbase,groupId){
    let queryUrl =
      '?docbase=' + docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&groupId=' + groupId;
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getGroupsChildren'] + queryUrl);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}


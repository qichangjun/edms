import { Injectable } from '@angular/core';
import { Http, Headers, Response,URLSearchParams,RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConstantService } from '../../services/constant.service'
import { ApiUrlService } from '../../services/apiUrl.service'
import { AuthenticationService } from '../../services/authentication.service'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class FileBaseService {
  constructor(
    private http : Http,
    private _constantService  : ConstantService,
    private  _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService
  ) {}
  getTreeDataPaths(params:any) {
    let ids = []
    if (params.ids && params.ids.length == 0){
      ids = [0]
    } else {
      ids = params.ids
    }
    let queryUrl =
      '?ids=' + ids +
      '&docbase=' + params.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&column=' + 'object_name' +
      '&direction=' + 'asc';
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getTreeDataPaths'] + queryUrl)
  }

  getBreadCrumb(params: any) {
    let queryUrl =
      '?ids=' + params.ids +
      '&docbase=' + params.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser;
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getBreadCrumb'] +queryUrl);
  }

  getList(parameters,parentId,init) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let info = Object.assign({}, parameters);
    if (init){
      info.pageSize = parameters.currentPage * parameters.pageSize
      info.currentPage = 1
    }
    let queryUrl =
      '?parentId=' + parentId +
      '&docbase=' + parameters.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&type=' + parameters.type;
    let params = {orders:[],length:info.pageSize,page:info.currentPage,columns:[]}
    let orders = [];
    if(parameters.type == 2 || parameters.type == 3){
      orders.push({direction:'asc',column:'r_object_type'})
    }
    if(parameters.dir && parameters.prop){
      orders.push({direction:parameters.dir,column:parameters.prop})
    }
    params.orders = orders
    if(parameters.object_name){
      params.columns.push({
        "name": "object_name",
        "predicate": "LIKE_BEFORE",
        "type": "string",
        "value": parameters.object_name
      })
    }
    if(parameters.a_status && parameters.a_status.length > 0 && parameters.ids.length == 1){
      params.columns.push({
        "name": "a_status",
        "predicate": "IN",
        "type": "string",
        "value": parameters.a_status.join(',')
      })
    }
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['getFileList'] + queryUrl,JSON.stringify(params),{headers:headers});
  }

  newFolder(parameters:any) {
    let info = Object.assign({}, parameters)
    let params: URLSearchParams = new URLSearchParams();
    for(let key in info){
      params.set(key.toString(), info[key]);
    };
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['newFolder'],{search: params})
  }

  newFileCabinet(parameters:any) {
    let info = Object.assign({}, parameters)
    let params: URLSearchParams = new URLSearchParams();
    for(let key in info){
      params.set(key.toString(), info[key]);
    };
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['newFileCabinet'],{search: params})
  }

  translateFile(id : string,params) {
    let ids = [];
    params.selected.forEach((item)=>{
      ids.push(item.r_object_id)
    })
    let queryUrl =
      '?id=' + id +
      '&ids=' + ids +
      '&parentId=' + params.parentId +
      '&docbase=' + params.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage();
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService[params.type] +queryUrl);
  }

  getPosition(params) {
    let queryUrl =
      '?id=' + params.selected[0].r_object_id +
      '&docbase=' + params.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage();
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getPosition'] + queryUrl);
  }

  getDeleteInfo(id,docbase){
    let queryUrl =
      '?id=' + id +
      '&docbase=' + docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage();
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getDeleteInfo'] + queryUrl);
  }

  deleteFile(parameters:any,docbase : string,parentId) {
    let info = Object.assign({}, parameters)
    let params: URLSearchParams = new URLSearchParams();
    for(let key in info){
      params.set(key.toString(), info[key]);
    };
    params.set('id',parentId);
    params.set('docbase',docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['deleteFile'],{search: params})
  }

  searchIdsByPosition(params,path : string) {
    let queryUrl =
      '?docbase=' + params.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&location=' + path;
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['searchIdsByPosition'] + queryUrl);
  }

  setMulJurisdiction(params,docbase : string,ids:Array<any>) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let queryUrl =
      '?docbase=' + docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&ids=' + ids +
      '&cascade=' + 6;
    let para = {permitVOs : params};
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['setMulJurisdiction'] + queryUrl,JSON.stringify(para),{headers:headers});
  }

  getVersionList(params) {
    let queryUrl =
      '?docbase=' + params.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&id=' + params.selected[0].r_object_id;
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getVersionList'] + queryUrl);
  }

  removeCurrentVersion(id,params) {
    let queryUrl =
      '?docbase=' + params.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&ids=' + [id] +
      '&types=' + [2] +
      '&id=' + params.parentId;
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['deleteFile'] + queryUrl);
  }

  getInfo(info,params,option){
    let queryUrl =
      '?docbase=' + params.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&objectId=' + info.r_object_id +
      '&option=' + option +
      '&typeName=' + info.r_object_type;
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getInfo'] + queryUrl);
  }

  checkAttrList(params,docbase,option) {
    let queryUrl =
      '?docbase=' + docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&option=' + option +
      '&typeName=' + params.typeName;
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['checkAttrList'] + queryUrl);
  }

  download(id,params) {
    let queryUrl =
      '?docbase=' + params.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&ids=' + id;
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['download'] + queryUrl);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}


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
    }else{
      orders.push({direction:'asc',column:'object_name'})
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

  newFolder(entity,docbase,params:any) {
    let info = Object.assign([], params)
    info.forEach((item)=>{
      if(item['inputMode'] == 2){
        if (item.attrValue){
          item['attrValue'] = new Date(item['attrValue']).toLocaleDateString().replace(/\//g,   "-")
        }
      }
    })
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let queryUrl =
      '?docbase=' + docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&typeName=' + entity.typeName +
      '&id=' + entity.parentId;
    let para = {attributeList : info};
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['newFolder'] + queryUrl,JSON.stringify(para),{headers:headers});
  }

  newFileCabinet(parameters:any,params:Array<any>) {
    let info = Object.assign([], params)
    info.forEach((item)=>{
      if(item['inputMode'] == 2){
        if (item.attrValue){
          item['attrValue'] = new Date(item['attrValue']).toLocaleDateString().replace(/\//g,   "-")
        }
      }
    })
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let queryUrl =
      '?docbase=' + parameters.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&typeName=' + parameters.typeName;
    let para = {attributeList : info};
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['newFileCabinet'] + queryUrl,JSON.stringify(para),{headers:headers});
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

  getLimit(info,params){
    let queryUrl =
      '?docbase=' + params.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&id=' + info.r_object_id;
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getLimit'] + queryUrl);
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

  updateInfo(id,params,docbase){
    let info = Object.assign([], params)
    info.forEach((item)=>{
      if(item['inputMode'] == 2){
        if (item.attrValue){
          item['attrValue'] = new Date(item['attrValue']).toLocaleDateString().replace(/\//g,   "-")
        }
      }
    })
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let queryUrl =
      '?docbase=' + docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&id=' + id;
    let para = {attributeList : info};
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['updateInfo'] + queryUrl,JSON.stringify(para),{headers:headers});
  }

  updateLimit(id,params,docbase){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let queryUrl =
      '?docbase=' + docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&id=' + id +
      '&cascade=' + 6;
    let para = {permitVOs : params};
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['updateLimit'] + queryUrl,JSON.stringify(para),{headers:headers});
  }

  updateName(id,name,docbase){
    let info = []
    info.push({
      attrName : 'object_name',
      attrValue : name
    })
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let queryUrl =
      '?docbase=' + docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&id=' + id;
    let para = {attributeList : info};
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['updateInfo'] + queryUrl,JSON.stringify(para),{headers:headers});
  }

  download(id,params) {
    let queryUrl =
      '?docbase=' + params.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&ids=' + id;
    let url = this._constantService.baseUrl() + this._apiUrlService['download'] + queryUrl
    window.open(url)
  }

  exportLimits(params,cascade,exportToHtml) {
    let queryUrl =
      '?docbase=' + params.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&cascade=' + cascade +
      '&exportToHtml=' + exportToHtml +
      '&id=' + params.selected[0].r_object_id;
    let url = this._constantService.baseUrl() + this._apiUrlService['exportLimits'] + queryUrl
    window.open(url)
  }

  getListTypes(params){
    let ids = []
    params.selected.forEach((item)=>{
      ids.push(item['r_object_id'])
    })
    let queryUrl =
      '?docbase=' + params.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&ids=' + ids;
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getListTypes'] + queryUrl);
  }

  setMulPro(params,typeName,attrLists){
    let ids = []
    params.selected.forEach((c)=>{
      ids.push(c.r_object_id)
    })
    let info = Object.assign({}, attrLists)
    let type = []
    for (let key in info){
      if (info[key].length > 0){
        let _arr = info[key].filter((c)=>{
          return c.isChecked
        })
        type.push({
          attributeList : _arr,
          typeName : key
        })
      }
    }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let queryUrl =
      '?docbase=' + params.docbase +
      '&accessToken=' + this._authenticationService.getCurrentUser().accessToken +
      '&accessUser=' + this._authenticationService.getCurrentUser().accessUser +
      '&locale=' + this._authenticationService.getCurrentLanguage() +
      '&ids=' + ids +
      '&typeName=' + typeName;
    let para = {type : type};
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['setMulPro'] + queryUrl,JSON.stringify(para),{headers:headers});
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}


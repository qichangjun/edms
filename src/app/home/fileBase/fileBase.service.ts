import { Injectable } from '@angular/core';
import { Http, Headers, Response,URLSearchParams,RequestOptionsArgs,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConstantService } from '@commonService/constant.service'
import { ApiUrlService } from '@commonService/apiUrl.service'
import { AuthenticationService } from '@commonService/authentication.service'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()

export class FileBaseService {
  constructor(
    private http : Http,
    private _constantService  : ConstantService,
    private  _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService,
    public toastr: ToastsManager,
    private router: Router
  ) {
  }
  
  getTreeDataPaths(parameter:any) : Promise<any> {
    let ids = []
    if (parameter.ids && parameter.ids.length == 0){
      ids = [0]
    } else {
      ids = parameter.ids
    }
    let params = new URLSearchParams();
    params.set('ids',parameter.ids)
    params.set('docbase',parameter.docbase)
    params.set('column','object_name')
    params.set('direction','asc')
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)    
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getTreeDataPaths'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }
  
  getBreadCrumb(parameter: any) : Promise<any> {
    let params = new URLSearchParams();
    params.set('ids',parameter.ids)
    params.set('docbase',parameter.docbase)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)    
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getBreadCrumb'],{ search: params })
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  getCommonSearchList(parameters: any,parentId,init) : Promise<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });    
    let info = Object.assign({}, parameters);
    if (init){
      info.pageSize = parameters.currentPage * parameters.pageSize
      info.currentPage = 1
    }
    let params = new URLSearchParams();
    params.set('docbase',info.docbase)
    params.set('parentId',parentId)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)    
    params.set('locale',this._authenticationService.getCurrentLanguage())
    params.set('type',parameters.type)
    params.set('keywords',parameters.keywords)
    let post_data = {orders:[],length:info.pageSize,page:info.currentPage,columns:[]}
    let orders = [];
    if(parameters.type == 2 || parameters.type == 3){
      orders.push({direction:'asc',column:'r_object_type'})
    }
    if(parameters.dir && parameters.prop){
      orders.push({direction:parameters.dir,column:parameters.prop})
    }else{
      orders.push({direction:'asc',column:'object_name'})
    }
    post_data.orders = orders
    if(parameters.object_name){
      post_data.columns.push({
        "name": "object_name",
        "predicate": "LIKE_BEFORE",
        "type": "string",
        "value": parameters.object_name
      })
    }
    if(parameters.a_status && parameters.a_status.length > 0 && parameters.ids.length == 1){
      post_data.columns.push({
        "name": "a_status",
        "predicate": "IN",
        "type": "string",
        "value": parameters.a_status.join(',')
      })
    }
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['getCommonSearchList'] + '?' + params ,JSON.stringify(post_data),options)
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  getList(parameters,parentId,init) : Promise<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });    
    let info = Object.assign({}, parameters);
    if (init){
      info.pageSize = parameters.currentPage * parameters.pageSize
      info.currentPage = 1
    }
    let params = new URLSearchParams();
    params.set('parentId',parentId)
    params.set('docbase',info.docbase)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)    
    params.set('locale',this._authenticationService.getCurrentLanguage())
    params.set('type',parameters.type)
    let post_data = {orders:[],length:info.pageSize,page:info.currentPage,columns:[]}
    let orders = [];
    if(parameters.type == 2 || parameters.type == 3){
      orders.push({direction:'asc',column:'r_object_type'})
    }
    if(parameters.dir && parameters.prop){
      orders.push({direction:parameters.dir,column:parameters.prop})
    }else{
      orders.push({direction:'asc',column:'object_name'})
    }
    post_data.orders = orders
    if(parameters.object_name){
      post_data.columns.push({
        "name": "object_name",
        "predicate": "LIKE_BEFORE",
        "type": "string",
        "value": parameters.object_name
      })
    }
    if(parameters.a_status && parameters.a_status.length > 0 && parameters.ids.length == 1){
      post_data.columns.push({
        "name": "a_status",
        "predicate": "IN",
        "type": "string",
        "value": parameters.a_status.join(',')
      })
    }
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['getFileList'] + '?' + params ,JSON.stringify(post_data),options)
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  newFolder(entity,docbase,parameter:any) : Promise<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers }); 
    let info = Object.assign([], parameter)
    info.forEach((item)=>{
      if(item['inputMode'] == 2){
        if (item.attrValue){
          item['attrValue'] = new Date(item['attrValue']).toLocaleDateString().replace(/\//g,   "-")
        }
      }
    })
    let params = new URLSearchParams();
    params.set('docbase',docbase)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)    
    params.set('locale',this._authenticationService.getCurrentLanguage())
    params.set('typeName',entity.typeName)
    params.set('id',entity.parentId)
    let post_data = {attributeList : info};
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['newFolder'] + '?' + params,JSON.stringify(post_data),options)
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  newFileCabinet(parameters:any,data_arr:Array<any>) : Promise<any>{
    let info = Object.assign([], data_arr)
    info.forEach((item)=>{
      if(item['inputMode'] == 2){
        if (item.attrValue){
          item['attrValue'] = new Date(item['attrValue']).toLocaleDateString().replace(/\//g,   "-")
        }
      }
    })
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers }); 
    let params = new URLSearchParams();
    params.set('docbase',parameters.docbase)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)    
    params.set('locale',this._authenticationService.getCurrentLanguage())
    params.set('typeName',parameters.typeName)    
    let para = {attributeList : info};
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['newFileCabinet'] + '?' + params,JSON.stringify(para),options)
                     .toPromise()
                     .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  translateFile(id : string,parameters) : Promise<any>{
    let ids = [];
    parameters.selected.forEach((item)=>{
      ids.push(item.r_object_id)
    })
    let params = new URLSearchParams();
    params.set('docbase',parameters.docbase)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)    
    params.set('locale',this._authenticationService.getCurrentLanguage())
    params.set('parentId',parameters.parentId)  
    params.set('id',id) 
    params.set('ids',ids.toString()) 
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService[parameters.type] ,{search : params})
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  getPosition(objectId,docbase) : Promise<any>{
    let params = new URLSearchParams();
    params.set('docbase',docbase)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)    
    params.set('locale',this._authenticationService.getCurrentLanguage())
    params.set('id',objectId)
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getPosition'],{search : params})
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  getDeleteInfo(id,docbase) : Promise<any>{
    let params = new URLSearchParams();
    params.set('docbase',docbase)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)    
    params.set('locale',this._authenticationService.getCurrentLanguage())
    params.set('id',id)
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getDeleteInfo'],{search : params})      
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  deleteFile(parameters:any,docbase : string,parentId) : Promise<any>{
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
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  searchIdsByPosition(parameter,path : string) : Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',parameter.docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    params.set('location',path);   
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['searchIdsByPosition'],{search: params})
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }
 
  setMulJurisdiction(parameters,docbase : string,ids:Array<any>,cascade) : Promise<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers }); 
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    params.set('ids',ids.toString()); 
    if (cascade){
      params.set('cascade','6');
    } else {
      params.set('cascade','3');
    }    
    let para = {permitVOs : parameters};
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['setMulJurisdiction'] + '?' + params,JSON.stringify(para),{headers:headers})
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  getVersionList(parameters) : Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',parameters.docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    params.set('id',parameters.selected[0].r_object_id);
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getVersionList'],{search:params})
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  removeCurrentVersion(id,parameter) : Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',parameter.docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    params.set('id',parameter.parentId);
    params.set('ids',id);
    params.set('types','2');
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['deleteFile'],{search:params})
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  getInfo(info,parameters,option) : Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',parameters.docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    params.set('objectId',info.r_object_id);
    params.set('option',option);
    params.set('typeName',info.r_object_type);
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getInfo'],{search:params})
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  getLimit(info,parameters) : Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',parameters.docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    params.set('id',info.r_object_id);
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getLimit'],{search:params})
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  checkAttrList(parameters,docbase,option) : Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    params.set('option',option);
    params.set('typeName',parameters.typeName);
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['checkAttrList'],{search:params})
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  updateInfo(id,parameters,docbase) : Promise<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers }); 
    let info = Object.assign([], parameters)
    info.forEach((item)=>{
      if(item['inputMode'] == 2){
        if (item.attrValue){
          item['attrValue'] = new Date(item['attrValue']).toLocaleDateString().replace(/\//g,   "-")
        }
      }
    })   
    let post_data = {attributeList : info};
    let params: URLSearchParams = new URLSearchParams(); 
    params.set('docbase',docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    params.set('id',id);
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['updateInfo'] + '?' + params,JSON.stringify(post_data),options)
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  updateLimit(id,parameter,docbase) : Promise<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers }); 
    let params: URLSearchParams = new URLSearchParams(); 
    params.set('docbase',docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    params.set('id',id);
    params.set('cascade','6');
    let post_data = {permitVOs : parameter};
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['updateLimit'] + '?' + params,JSON.stringify(post_data),options)
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  download(id,parameters) {
    let params: URLSearchParams = new URLSearchParams(); 
    params.set('docbase',parameters.docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    params.set('ids',id);
    let url = this._constantService.baseUrl() + this._apiUrlService['download'] + '?' + params
    window.open(url)
  }

  exportLimits(docbase,selected,cascade,exportToHtml) {
    let params: URLSearchParams = new URLSearchParams(); 
    params.set('docbase',docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    params.set('cascade',cascade);
    params.set('exportToHtml',exportToHtml);
    params.set('id',selected[0].r_object_id);
    let url = this._constantService.baseUrl() + this._apiUrlService['exportLimits'] + '?' + params
    window.open(url)
  }

  getListTypes(parameters) : Promise<any>{
    let ids = []
    parameters.selected.forEach((item)=>{
      ids.push(item['r_object_id'])
    })
    let params: URLSearchParams = new URLSearchParams(); 
    params.set('docbase',parameters.docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    params.set('ids',ids.toString());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getListTypes'],{search:params})
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  setMulPro(parameters,typeName,attrLists) : Promise<any>{
    let ids = []
    parameters.selected.forEach((c)=>{
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
    let options = new RequestOptions({ headers: headers }); 
    let params: URLSearchParams = new URLSearchParams(); 
    params.set('docbase',parameters.docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    params.set('ids',ids.toString());
    params.set('typeName',typeName);
    let post_data = {type : type};
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['setMulPro'] + '?' + params,JSON.stringify(post_data),options)
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  public handleError(error: any,scope): Promise<any> {
    // scope.toastr.error('An error occurred')
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  public extractData(res: Response,scope) {
    let body = res.json();    
    if (body.code == 1){
      return body.data || { };
    }else{
      if (body.message == '用户认证失败'){
        scope.router.navigate(['/login']);
      }
      scope.toastr.error(body.message)
      return Promise.reject(body.message);
    }    
  }

  public extractDataSuccess(res: Response,scope) {      
    let body = res.json();    
    if (body.code == 1){      
      scope.toastr.success(body.message)
      return body.data || { };
    }else{        
      if (body.message == '用户认证失败'){
        scope.router.navigate(['/login']);
      }    
      scope.toastr.error(body.message)
      return Promise.reject(body.message);
    }    
  }
}


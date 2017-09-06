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

export class RoleService {
  constructor(
    private http : Http,
    private _constantService  : ConstantService,
    private  _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService,
    public toastr: ToastsManager,
    private router: Router
  ) {}

  getGroupList(parameters,init) : Promise<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });   
    let info = Object.assign({}, parameters);
    if (init){
      info.pageSize = parameters.currentPage * parameters.pageSize
      info.currentPage = 1
    }
    let post_data = {orders:[],columns:[]}
    let orders = [];
    if(parameters.dir && parameters.prop){
      orders.push({direction:parameters.dir,column:parameters.prop})
      post_data.orders = orders
    }
    let columns = [];
    if (parameters.keywords){
      columns.push({name : 'loginName',predicate : 'LIKE',type : 'string',value : parameters.keywords});
      columns.push({name : 'userName',predicate : 'LIKE',type : 'string',value : parameters.keywords});
      post_data.columns = columns
    }
    let params = new URLSearchParams();
    params.set('pageSize',info.pageSize)
    params.set('docbase',parameters.docbase)
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken)
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser)    
    params.set('locale',this._authenticationService.getCurrentLanguage())
    params.set('currentPage',info.currentPage)
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['getGroupList'] + '?' + params,JSON.stringify(post_data),options)
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  createRole(parameters:any) : Promise<any> {
    let info = Object.assign({}, parameters)
    let params: URLSearchParams = new URLSearchParams();
    for(let key in info){
      params.set(key.toString(), info[key]);
    };
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['createRole'],{search: params})
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }
  updateGroup(parameters:any,docbase : string) : Promise<any> {
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
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  removeRole(parameters:any) : Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',parameters.docbase);
    params.set('roleId',parameters.row.objectId);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['removeRole'],{search: params})
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  removeMember(parameters:any) : Promise<any>{
    let ids = []
    parameters.selected.forEach((c)=>{
      ids.push(c.objectId)
    })
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',parameters.docbase);
    params.set('memberIds',ids.toString());
    params.set('roleId',parameters.targetId);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['removeRoleMember'],{search : params})
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  addMember(parameters:any,selectedList : Array<any>) : Promise<any>{
    let ids = []
    selectedList.forEach((c)=>{
      ids.push(c.objectId)
    });
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',parameters.docbase);
    params.set('memberIds',ids.toString());
    params.set('roleId',parameters.targetId);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['addRoleMember'],{search : params})
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  getUserAndGroupList(parameters,docbase,groupId?) : Promise<any>{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });   
    let info = Object.assign({}, parameters);
    info.keywords = info.keywords || ''
    let post_data = {orders:[],page:1,length:50}
    if(parameters.dir && parameters.prop){
      post_data.orders.push({direction:parameters.dir,column:parameters.prop})
    }
    post_data.page = info.currentPage;
    post_data.length = info.pageSize;
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',parameters.docbase);
    params.set('objectType',info.objectType);
    params.set('keywords',info.keywords);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());   
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['getUserAndGroupList'] + '?' + params,JSON.stringify(post_data),options)
                .toPromise()
                .then(res =>
                  this.extractData(res,this)
                )
                .catch(error =>
                  this.handleError(error,this)
                );

  }

  searchGroupChild(docbase,groupId) : Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',docbase);
    params.set('groupId',groupId);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());   
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getGroupsChildren'],{search : params})
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  searchRoleChild(docbase,roleId) : Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',docbase);
    params.set('roleId',roleId);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());   
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['searchRoleChild'],{search : params})
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  getRoleInfo(roleId,roleName,docbase) : Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',docbase);
    params.set('roleName',roleName);
    params.set('roleId',roleId);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());   
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getRoleInfo'],{search : params})
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }
  

  reAssignRole(parameters,docbase : string,targetId) : Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',docbase);
    params.set('roleId',parameters.objectId);
    params.set('targetRoleId',targetId);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['reAssignRole'],{search: params})
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  checkRoleParent(parameters,docbase : string) : Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',docbase);
    params.set('roleId',parameters.objectId);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['checkRoleParent'],{search: params})
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  updateRole(parameters:any,docbase : string) : Promise<any>{
    let info = Object.assign({}, parameters)
    let params: URLSearchParams = new URLSearchParams();
    for(let key in info){
      params.set(key.toString(), info[key]);
    };
    params.set('docbase',docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['updateRole'],{search: params})
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


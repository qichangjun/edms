import { Injectable } from '@angular/core';
import { Http, Headers, Response,URLSearchParams,RequestOptionsArgs,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConstantService } from '@commonService/constant.service'
import { ApiUrlService } from '@commonService/apiUrl.service'
import { AuthenticationService } from '@commonService/authentication.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()

export class UserService {
  constructor(
    private http : Http,
    private _constantService  : ConstantService,
    private  _apiUrlService : ApiUrlService,
    private _authenticationService : AuthenticationService,
    public toastr: ToastsManager,
    private router: Router
  ) {}
  getUserList(parameters,init): Promise<any>{
    let info = Object.assign({}, parameters);
    if (init){
      info.pageSize = parameters.currentPage * parameters.pageSize
      info.currentPage = 1
    }
    let post_data = {orders:[],page:info.currentPage,length:info.pageSize}
    let orders = [];
    if(parameters.dir && parameters.prop){
      orders.push({direction:parameters.dir,column:parameters.prop})
      post_data.orders = orders
    }
    info.keywords = info.keywords || ''
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers }); 
    let params: URLSearchParams = new URLSearchParams(); 
    params.set('docbase',info.docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    params.set('objectType',info.objectType);
    params.set('keywords',info.keywords);
    return this.http.post(this._constantService.baseUrl() + this._apiUrlService['getUserList'] + '?' + params,JSON.stringify(post_data),options)
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  createUser(parameters:any) : Promise<any>{
    let info = Object.assign({}, parameters)
    if (!info.userGroupName){
      info.userGroupName = null
    }
    let params: URLSearchParams = new URLSearchParams();
    for(let key in info){
      params.set(key.toString(), info[key]);
    };
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['createUser'],{search: params})
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }
  
  removeUser(parameters:any) : Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',parameters.docbase);
    params.set('userId',parameters.row.objectId);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['removeUser'],{search: params})
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  checkUsersGroup(parameters,docbase : string) : Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',docbase);
    params.set('userId',parameters.objectId);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['checkUsersGroup'],{search: params})
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  reAssignUser(parameters,docbase : string,targetId) : Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',docbase);
    params.set('userId',parameters.objectId);
    params.set('targetUserId',targetId);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['reAssignUser'],{search: params})
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  updateUser(parameters:any,docbase : string) : Promise<any>{
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
                    .toPromise()
                    .then(res =>
                      this.extractDataSuccess(res,this)
                    )
                    .catch(error =>
                      this.handleError(error,this)
                    );
  }

  getUserInfo(userId,userName,docbase) : Promise<any>{
    let params: URLSearchParams = new URLSearchParams();
    params.set('docbase',docbase);
    params.set('accessToken',this._authenticationService.getCurrentUser().accessToken);
    params.set('accessUser',this._authenticationService.getCurrentUser().accessUser);
    params.set('locale',this._authenticationService.getCurrentLanguage());
    params.set('userName',userName);
    params.set('userId',userId);
    return this.http.get(this._constantService.baseUrl() + this._apiUrlService['getUserInfo'],{search: params})
                    .toPromise()
                    .then(res =>
                      this.extractData(res,this)
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


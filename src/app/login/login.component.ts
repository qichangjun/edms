import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthenticationService } from '../services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})

export class LoginComponent implements OnInit {
  loading = false;
  showErrorMessage : boolean = false;
  focuseUserName : boolean = false;
  focusePssword : boolean = false;
  remember : boolean = false;

  model: any = {};
  returnUrl: string;

  constructor(
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate : TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.authenticationService.logout();
    this.model.language = this.authenticationService.getCurrentLanguage() || 'cn';
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password,this.model.language)
      .subscribe(
        data => {
          let user = data.json();
          if (user.code == 1){
            this.toastr.success(user.message);
            localStorage.setItem('currentUserToken', JSON.stringify({accessToken:user.data.accessToken,accessUser:user.data.accessUser}));
            localStorage.setItem('currentLanguage', this.model.language);
            this.router.navigate([this.returnUrl]);
          }else{
            this.toastr.error(user.message);
            this.loading = false;
          }
        },
        error => {
          this.toastr.error('服务器内部出错');
          this.loading = false;
        });
  }
}

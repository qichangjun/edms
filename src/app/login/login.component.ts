import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthenticationService } from '../services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ],
  animations: [
    trigger('isInputError', [
      state('0' , style({ opacity: 1})),
      state('1', style({ opacity: 1,})),
      transition('0 => 1', [
        animate(300, keyframes([
          style({transform: 'translateX(-10px)', offset: 0}),
          style({transform: 'translateX(10px)',  offset: 0.3}),
          style({transform: 'translateX(-5px)', offset: 0.6}),
          style({transform: 'translateX(5px)', offset: 0.9}),
          style({transform: 'translateX(0)',     offset: 1.0})
        ]))
      ])
    ])
  ]
})

export class LoginComponent implements OnInit {
  loading = false;
  showErrorMessage : boolean = false;
  focuseUserName : boolean = false;
  focusePssword : boolean = false;
  remember : boolean = false;
  errorMessage : string;

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
    this.showErrorMessage = false
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
            this.showErrorMessage = true
            this.errorMessage = user.message
            //this.toastr.error(user.message);
            this.loading = false;
          }
        },
        error => {
          this.toastr.error('服务器内部出错');
          this.loading = false;
        });
  }
}

import { Component,AfterViewInit,OnInit,ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  constructor(
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    translate : TranslateService,
    authenticationService : AuthenticationService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('cn');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(authenticationService.getCurrentLanguage() || 'cn' );
  }

}

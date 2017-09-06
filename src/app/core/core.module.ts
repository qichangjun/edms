import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule,TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule,Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule,MdDialogConfig } from '@angular/material';
import { AppRoutingModule } from '../app-routing.module';
import { TieredMenuModule,MenuModule,MenuItem } from 'primeng/primeng';            //api
import { AccordionModule } from 'primeng/primeng';     //accordion and accordion tab

// import { AutoFormComponent } from './component/autoForm/autoForm.component'
import { CascadeSelectComponent } from './component/cascadeSelect/cascadeSelect.component'
import { NavComponent } from './component/nav/nav.component';
import { ToolBarComponent } from './component/toolBar/toolBar.component';
import { ZTreeComponent } from './component/zTree/zTree.component';
import { BreadCrumbComponent } from './component/breadCrumb/breadCrumb.component';
import { GridListComponent } from './component/gridList/gridList.component';
import { MultiSelectBoardComponent } from './component/multiSelectBoard/multiSelectBoard.component'
import { MultiJurisdictionComponent } from './component/mulJurisdiction/mulJurisdiction.component'
import { LoadingMessageComponent } from './component/loadingMessage/loadingMessage.component'
import { SingleSelectUsernComponent } from './component/singeleSelectUser/singleSelectUser.component'
import { ToolBarService } from './component/toolBar/toolBar.service'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MessageVerifyDirective } from './directive/messageVerify/messageVerify.directive'
import { CountWidthDirective } from './directive/countWidth/countWidth.directive'
import { ShakingAnimationDirective } from './directive/shakingAnimation/shakingAnimation.directive'

import { Sizefilter } from './filter/size.filter';
import { SafeUrlPipe } from './filter/safeUrl.pipe'
import { SafeHtmlPipe } from './filter/safeHtml.pipe'

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    FormsModule,
    TieredMenuModule,
    ReactiveFormsModule,
    MenuModule,
    AccordionModule,
    NgxDatatableModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    CommonModule // we use ngFor
  ],
  exports: [
    Sizefilter,
    SafeUrlPipe,
    SafeHtmlPipe,
    NavComponent,
    ToolBarComponent,
    ZTreeComponent,
    BreadCrumbComponent,
    GridListComponent,
    MultiSelectBoardComponent,
    MessageVerifyDirective,
    MultiJurisdictionComponent,
    CountWidthDirective,
    LoadingMessageComponent,
    ShakingAnimationDirective,
    SingleSelectUsernComponent,
    CascadeSelectComponent
    // AutoFormComponent    
  ],
  declarations: [Sizefilter,
    SafeUrlPipe,
    SafeHtmlPipe,
    NavComponent,
    ToolBarComponent,
    ZTreeComponent,
    BreadCrumbComponent,
    GridListComponent,
    MultiSelectBoardComponent,
    MessageVerifyDirective,
    MultiJurisdictionComponent,
    CountWidthDirective,
    LoadingMessageComponent,
    ShakingAnimationDirective,
    SingleSelectUsernComponent,
    CascadeSelectComponent
    // AutoFormComponent
  ],
  providers: [MdDialogConfig,ToolBarService]
})
export class CoreModule { }

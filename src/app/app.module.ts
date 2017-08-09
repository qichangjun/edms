import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';

import { DndModule } from 'ng2-dnd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule,MdDialogConfig,MdNativeDateModule } from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreModule } from './core/core.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ToastModule } from 'ng2-toastr/ng2-toastr'
import { ResizableModule } from 'angular-resizable-element';
import { TranslateModule,TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';


import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'
import { MainComponent } from './main/main.component'
import { FileBaseComponent,newFolderDialog,editMultipleDialog,translateFileDialog,newFileCabinetDialog,checkPositionDialog,removeFileDialog,setMulJurisdictionDialog,versionManageDialog } from './home/fileBase/fileBase.component'
import { UserManageComponent } from './home/userManage/userManage.component'
import { GroupComponent,createGroupDialog,removeGroupDialog } from './home/userManage/group/group.component'
import { RoleComponent } from './home/userManage/role/role.component'
import { UserComponent,createUserDialog,removeUserDialog } from './home/userManage/user/user.component'
import { UserInfoComponent } from './home/userManage/user/userInfo/userInfo.component'
import { GroupInfoComponent } from './home/userManage/group/groupInfo/groupInfo.component'
import { UploadFileComponent } from './home/uploadFile/uploadFile.component'
import { FileBaseService } from './home/fileBase/fileBase.service'
import { GroupService } from './home/userManage/group/group.service'
import { UserService } from './home/userManage/user/user.service'
import { FileInfoComponent } from './home/fileBase/fileInfo/fileInfo.component'
import { ProjectFileComponent } from './home/projectFile/projectFile.component'
import { EventService } from './services/behavior.service'

import { AuthenticationService } from './services/authentication.service'
import { ConstantService } from './services/constant.service'
import { ApiUrlService } from './services/apiUrl.service'
import 'hammerjs';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MainComponent,
    FileBaseComponent,
    FileInfoComponent,
    newFolderDialog,
    editMultipleDialog,
    translateFileDialog,
    newFileCabinetDialog,
    checkPositionDialog,
    createUserDialog,
    removeFileDialog,
    versionManageDialog,
    setMulJurisdictionDialog,
    ProjectFileComponent,
    UserManageComponent,
    GroupComponent,
    UserComponent,
    RoleComponent,
    UserInfoComponent,
    GroupInfoComponent,
    removeGroupDialog,
    createGroupDialog,
    removeUserDialog,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdNativeDateModule,
    NgxDatatableModule,
    CoreModule,
    AppRoutingModule,
    FileUploadModule,
    ToastModule.forRoot(),
    DndModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    MultiselectDropdownModule,
    ResizableModule
  ],
  entryComponents : [newFolderDialog,editMultipleDialog,translateFileDialog,newFileCabinetDialog,checkPositionDialog,createUserDialog,removeFileDialog,removeUserDialog,createGroupDialog,removeGroupDialog,setMulJurisdictionDialog,versionManageDialog],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthenticationService,
    UserService,
    GroupService,
    ConstantService,
    ApiUrlService,
    MdDialogConfig,
    AuthGuard,
    FileBaseService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

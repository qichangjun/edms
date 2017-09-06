import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule,Http } from '@angular/http';


import { DndModule } from 'ng2-dnd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule,MdDialogConfig,MdNativeDateModule,MdTabsModule } from '@angular/material';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CoreModule } from './core/core.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ToastModule,ToastOptions } from 'ng2-toastr/ng2-toastr'
import { ResizableModule } from 'angular-resizable-element';
import { TranslateModule,TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AuthGuard } from './guards/auth.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component'
import { MainComponent } from './main/main.component'
import { FileBaseComponent,cascadeSelectDialog,inputMultipleDialog,newFolderDialog,removeFileConfirmDialog,editMultipleDialog,translateFileDialog,newFileCabinetDialog,checkPositionDialog,removeFileDialog,setMulJurisdictionDialog,versionManageDialog,exportCurrFolderLimitsDialog,setMulProDialog,selectUserDialog } from './home/fileBase/index'
import { UserManageComponent } from './home/userManage/userManage.component'
import { GroupComponent,createGroupDialog,removeGroupDialog,removeMemberDialog,addMemberDialog,reAssignGroupDialog,checkGroupParentDialog } from './home/userManage/group/group.component'
import { RoleComponent,createRoleDialog,removeRoleDialog,checkRoleParentDialog,reAssignRoleDialog,removeRoleMemberDialog,addRoleMemberDialog } from './home/userManage/role/role.component'
import { UserComponent,createUserDialog,removeUserDialog,checkUsersGroupDialog,reAssignDialog } from './home/userManage/user/user.component'
import { UserInfoComponent } from './home/userManage/user/userInfo/userInfo.component'
import { GroupInfoComponent } from './home/userManage/group/groupInfo/groupInfo.component'
import { RoleInfoComponent } from './home/userManage/role/roleInfo/role-info.component'
import { UploadFileComponent } from './home/uploadFile/uploadFile.component'
import { FileBaseService } from './home/fileBase/fileBase.service'
import { GroupService } from './home/userManage/group/group.service'
import { RoleService } from './home/userManage/role/role.service'
import { UserService } from './home/userManage/user/user.service'
import { FileInfoComponent } from './home/fileBase/fileInfo/fileInfo.component'
import { EventService,hiddenChangeService } from './services/behavior.service'

import { AuthenticationService } from './services/authentication.service'
import { ConstantService } from './services/constant.service'
import { ApiUrlService } from './services/apiUrl.service'
import 'hammerjs';
import { PreviewDocComponent } from './preview-doc/preview-doc.component';


export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export class CustomOption extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  newestOnTop = false;
  positionClass = 'toast-top-center';
  toastLife = 1000;
  maxShown = 1;
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
    exportCurrFolderLimitsDialog,
    removeFileConfirmDialog,
    setMulProDialog,
    selectUserDialog,
    checkUsersGroupDialog,
    reAssignDialog,
    addMemberDialog,
    checkGroupParentDialog,
    createRoleDialog,
    UserManageComponent,
    GroupComponent,
    UserComponent,
    RoleComponent,
    UserInfoComponent,
    GroupInfoComponent,
    RoleInfoComponent,
    removeGroupDialog,
    createGroupDialog,
    removeUserDialog,
    removeMemberDialog,
    reAssignGroupDialog,
    removeRoleDialog,
    checkRoleParentDialog,
    reAssignRoleDialog,
    addRoleMemberDialog,
    removeRoleMemberDialog,
    UploadFileComponent,
    PreviewDocComponent,
    inputMultipleDialog,
    cascadeSelectDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdNativeDateModule,
    NgxDatatableModule,
    MdTabsModule,
    CoreModule,
    AppRoutingModule,
    FileUploadModule,
    NgbModule.forRoot(),
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
  entryComponents : [
    newFolderDialog,
    editMultipleDialog,
    translateFileDialog,
    newFileCabinetDialog,
    checkPositionDialog,
    createUserDialog,
    removeFileDialog,
    removeUserDialog,
    createGroupDialog,
    removeGroupDialog,
    selectUserDialog,
    checkUsersGroupDialog,
    setMulJurisdictionDialog,
    versionManageDialog,
    setMulProDialog,
    reAssignDialog,
    addMemberDialog,
    removeFileConfirmDialog,
    removeMemberDialog,
    reAssignGroupDialog,
    checkGroupParentDialog,
    createRoleDialog,
    removeRoleDialog,
    checkRoleParentDialog,
    reAssignRoleDialog,
    removeRoleMemberDialog,
    addRoleMemberDialog,
    exportCurrFolderLimitsDialog,
    inputMultipleDialog,
    cascadeSelectDialog
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: ToastOptions, useClass: CustomOption},
    AuthenticationService,
    UserService,
    GroupService,
    RoleService,
    ConstantService,
    ApiUrlService,
    MdDialogConfig,
    AuthGuard,
    FileBaseService,
    EventService,
    hiddenChangeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

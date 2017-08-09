import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { LoginComponent }   from './login/login.component';
import { FileBaseComponent }   from './home/fileBase/fileBase.component';
import { ProjectFileComponent }   from './home/projectFile/projectFile.component';
import { UserManageComponent } from './home/userManage/userManage.component'
import { MainComponent } from './main/main.component'
import { GroupComponent } from './home/userManage/group/group.component'
import { RoleComponent } from './home/userManage/role/role.component'
import { UserComponent } from './home/userManage/user/user.component'

import { AuthGuard } from './guards/auth.guard';
import { UploadFileComponent } from './home/uploadFile/uploadFile.component'

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard],
    children:[
      { path: '',  redirectTo: '/fileBase', pathMatch: 'full' },
      { path: 'fileBase',  component: FileBaseComponent },
      { path: 'projectFile',  component: FileBaseComponent },
      { path: 'userManage',component:UserManageComponent,children:[
        {path:'',redirectTo:'user',pathMatch:'full'},
        {path:'user',component:UserComponent},
        {path:'role',component:RoleComponent},
        {path:'group',component:GroupComponent}
      ]}
    ]
  },
  { path: 'uploadFile', component: UploadFileComponent, outlet: 'uploadFile' },
  { path: 'main',  component: MainComponent },
  { path: 'login',  component: LoginComponent },
  { path: '**', redirectTo: 'main' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

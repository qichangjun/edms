import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { MaterialModule,MdDialogConfig } from '@angular/material';
import { AppRoutingModule } from '../app-routing.module';
import { TieredMenuModule,MenuModule,MenuItem } from 'primeng/primeng';            //api
import { AccordionModule } from 'primeng/primeng';     //accordion and accordion tab

import { NavComponent } from './component/nav/nav.component';
import { ToolBarComponent } from './component/toolBar/toolBar.component';
import { ZTreeComponent } from './component/zTree/zTree.component';
import { BreadCrumbComponent } from './component/breadCrumb/breadCrumb.component';
import { GridListComponent } from './component/gridList/gridList.component';
import { MultiSelectBoardComponent } from './component/multiSelectBoard/multiSelectBoard.component'
import { MultiJurisdictionComponent } from './component/mulJurisdiction/mulJurisdiction.component'

import { ToolBarService } from './component/toolBar/toolBar.service'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MessageVerifyDirective } from './directive/messageVerify/messageVerify.directive'
import { CountWidthDirective } from './directive/countWidth/countWidth.directive'

import { Sizefilter } from './filter/size.filter';

@NgModule({
  imports: [
    FormsModule,
    TieredMenuModule,
    ReactiveFormsModule,
    MenuModule,
    AccordionModule,
    NgxDatatableModule,
    MaterialModule,
    AppRoutingModule,
    CommonModule // we use ngFor
  ],
  exports: [Sizefilter,NavComponent,ToolBarComponent,ZTreeComponent,BreadCrumbComponent,GridListComponent,MultiSelectBoardComponent,MessageVerifyDirective,MultiJurisdictionComponent,CountWidthDirective],
  declarations: [Sizefilter,NavComponent,ToolBarComponent,ZTreeComponent,BreadCrumbComponent,GridListComponent,MultiSelectBoardComponent,MessageVerifyDirective,MultiJurisdictionComponent,CountWidthDirective],
  providers: [MdDialogConfig,ToolBarService]
})
export class CoreModule { }
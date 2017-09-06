/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


import * as import0 from '../css/fileBase.dialog.scss.shim.ngstyle';
import * as import1 from '@angular/core';
import * as import2 from '../../../../core/component/loadingMessage/loadingMessage.component.ngfactory';
import * as import3 from '../../../../core/component/loadingMessage/loadingMessage.component';
import * as import4 from './setMulJurisdiction.dialog';
import * as import5 from '@angular/forms';
import * as import6 from '@angular/material';
import * as import7 from '../../../../core/component/mulJurisdiction/mulJurisdiction.component.ngfactory';
import * as import8 from '../../../../core/component/mulJurisdiction/mulJurisdiction.component';
import * as import9 from '../../../userManage/group/group.service';
import * as import10 from 'ng2-toastr/src/toast-manager';
import * as import11 from '../../../userManage/user/user.service';
import * as import12 from '../../../../../../node_modules/@angular/material/typings/index.ngfactory';
import * as import13 from '@angular/common';
import * as import14 from '@angular/cdk/platform';
import * as import15 from '@ngx-translate/core/src/translate.pipe';
import * as import16 from '@ngx-translate/core/src/translate.service';
import * as import17 from '../../fileBase.service';
const styles_setMulJurisdictionDialog:any[] = [import0.styles];
export const RenderType_setMulJurisdictionDialog:import1.RendererType2 = import1.ɵcrt({
  encapsulation: 0,
  styles: styles_setMulJurisdictionDialog,
  data: {}
}
);
function View_setMulJurisdictionDialog_1(l:any):import1.ɵViewDefinition {
  return import1.ɵvid(0,[
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'loading-message',([] as any[]),(null as any),(null as any),(null as any),import2.View_LoadingMessageComponent_0,import2.RenderType_LoadingMessageComponent)),
    import1.ɵdid(57344,(null as any),0,import3.LoadingMessageComponent,[import1.ElementRef],(null as any),(null as any))
  ]
  ,(ck,v) => {
    ck(v,1,0);
  },(null as any));
}
export function View_setMulJurisdictionDialog_0(l:any):import1.ɵViewDefinition {
  return import1.ɵvid(0,[
    (l()(),import1.ɵeld(0,(null as any),(null as any),54,'form',[
      [
        'name',
        'form'
      ]
      ,
      [
        'novalidate',
        ''
      ]

    ]
    ,[
      [
        2,
        'ng-untouched',
        (null as any)
      ]
      ,
      [
        2,
        'ng-touched',
        (null as any)
      ]
      ,
      [
        2,
        'ng-pristine',
        (null as any)
      ]
      ,
      [
        2,
        'ng-dirty',
        (null as any)
      ]
      ,
      [
        2,
        'ng-valid',
        (null as any)
      ]
      ,
      [
        2,
        'ng-invalid',
        (null as any)
      ]
      ,
      [
        2,
        'ng-pending',
        (null as any)
      ]

    ]
    ,[
      [
        (null as any),
        'ngSubmit'
      ]
      ,
      [
        (null as any),
        'submit'
      ]
      ,
      [
        (null as any),
        'reset'
      ]

    ]
    ,(v,en,$event) => {
      var ad:boolean = true;
      var co:import4.setMulJurisdictionDialog = v.component;
      if (('submit' === en)) {
        const pd_0:any = ((<any>import1.ɵnov(v,2).onSubmit($event)) !== false);
        ad = (pd_0 && ad);
      }
      if (('reset' === en)) {
        const pd_1:any = ((<any>import1.ɵnov(v,2).onReset()) !== false);
        ad = (pd_1 && ad);
      }
      if (('ngSubmit' === en)) {
        const pd_2:any = ((<any>(import1.ɵnov(v,2).form.valid && co.setJurisdiction())) !== false);
        ad = (pd_2 && ad);
      }
      return ad;
    },(null as any),(null as any))),
    import1.ɵdid(8192,(null as any),0,import5.ɵbf,([] as any[]),(null as any),(null as any)),
      import1.ɵdid(8192,[[
        'f',
        4
      ]
    ],0,import5.NgForm,[
      [
        8,
        (null as any)
      ]
      ,
      [
        8,
        (null as any)
      ]

    ]
    ,(null as any),{ngSubmit: 'ngSubmit'}),
    import1.ɵprd(1024,(null as any),import5.ControlContainer,(null as any),[import5.NgForm]),
    import1.ɵdid(8192,(null as any),0,import5.NgControlStatusGroup,[import5.ControlContainer],(null as any),(null as any)),
    (l()(),import1.ɵted((null as any),['\n  '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),2,'h2',[
      [
        'class',
        'mat-dialog-title'
      ]
      ,
      [
        'md-dialog-title',
        ''
      ]

    ]
      ,[[
        8,
        'id',
        0
      ]
    ],(null as any),(null as any),(null as any),(null as any))),
      import1.ɵdid(40960,(null as any),0,import6.MdDialogTitle,[[
        2,
        import6.MdDialogContainer
      ]
    ],(null as any),(null as any)),
    (l()(),import1.ɵted((null as any),['批量修改权限'])),
    (l()(),import1.ɵted((null as any),['\n  '])),
      (l()(),import1.ɵeld(0,(null as any),(null as any),23,'md-dialog-content',[[
        'class',
        'mat-dialog-content'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    import1.ɵdid(8192,(null as any),0,import6.MdPrefixRejector,[
      [
        2,
        import6.MATERIAL_COMPATIBILITY_MODE
      ]
      ,
      import1.ElementRef
    ]
    ,(null as any),(null as any)),
    import1.ɵdid(8192,(null as any),0,import6.MdDialogContent,([] as any[]),(null as any),(null as any)),
    (l()(),import1.ɵted((null as any),['\n    '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'multi-jurisdiction',([] as any[]),(null as any),(null as any),(null as any),import7.View_MultiJurisdictionComponent_0,import7.RenderType_MultiJurisdictionComponent)),
    import1.ɵdid(2416640,(null as any),0,import8.MultiJurisdictionComponent,[
      import9.GroupService,
      import10.ToastsManager,
      import11.UserService
    ]
    ,{
      selectedList: [
        0,
        'selectedList'
      ]
      ,
      type: [
        1,
        'type'
      ]
      ,
      selectType: [
        2,
        'selectType'
      ]
      ,
      docbase: [
        3,
        'docbase'
      ]

    }
    ,(null as any)),
    (l()(),import1.ɵted((null as any),['\n    '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),12,'div',([] as any[]),(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['\n      '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),6,'md-checkbox',[
      [
        'class',
        'mat-checkbox'
      ]
      ,
      [
        'id',
        'checkbox_al'
      ]
      ,
      [
        'name',
        'cascade'
      ]

    ]
    ,[
      [
        8,
        'id',
        0
      ]
      ,
      [
        2,
        'mat-checkbox-indeterminate',
        (null as any)
      ]
      ,
      [
        2,
        'mat-checkbox-checked',
        (null as any)
      ]
      ,
      [
        2,
        'mat-checkbox-disabled',
        (null as any)
      ]
      ,
      [
        2,
        'mat-checkbox-label-before',
        (null as any)
      ]
      ,
      [
        2,
        'ng-untouched',
        (null as any)
      ]
      ,
      [
        2,
        'ng-touched',
        (null as any)
      ]
      ,
      [
        2,
        'ng-pristine',
        (null as any)
      ]
      ,
      [
        2,
        'ng-dirty',
        (null as any)
      ]
      ,
      [
        2,
        'ng-valid',
        (null as any)
      ]
      ,
      [
        2,
        'ng-invalid',
        (null as any)
      ]
      ,
      [
        2,
        'ng-pending',
        (null as any)
      ]

    ]
      ,[[
        (null as any),
        'ngModelChange'
      ]
    ],(v,en,$event) => {
      var ad:boolean = true;
      var co:import4.setMulJurisdictionDialog = v.component;
      if (('ngModelChange' === en)) {
        const pd_0:any = ((<any>(co.cascade = $event)) !== false);
        ad = (pd_0 && ad);
      }
      return ad;
    },import12.View_MdCheckbox_0,import12.RenderType_MdCheckbox)),
    import1.ɵdid(2187264,(null as any),0,import6.MdCheckbox,[
      import1.Renderer2,
      import1.ElementRef,
      import1.ChangeDetectorRef,
      import6.FocusOriginMonitor
    ]
    ,{
      id: [
        0,
        'id'
      ]
      ,
      name: [
        1,
        'name'
      ]

    }
    ,(null as any)),
    import1.ɵprd(512,(null as any),import5.NG_VALUE_ACCESSOR,(p0_0:any) => {
      return [p0_0];
    },[import6.MdCheckbox]),
    import1.ɵdid(335872,(null as any),0,import5.NgModel,[
      [
        2,
        import5.ControlContainer
      ]
      ,
      [
        8,
        (null as any)
      ]
      ,
      [
        8,
        (null as any)
      ]
      ,
      [
        2,
        import5.NG_VALUE_ACCESSOR
      ]

    ]
    ,{
      name: [
        0,
        'name'
      ]
      ,
      model: [
        1,
        'model'
      ]

    }
    ,{update: 'ngModelChange'}),
    import1.ɵprd(1024,(null as any),import5.NgControl,(null as any),[import5.NgModel]),
    import1.ɵdid(8192,(null as any),0,import5.NgControlStatus,[import5.NgControl],(null as any),(null as any)),
    import1.ɵdid(8192,(null as any),0,import6.MdPrefixRejector,[
      [
        2,
        import6.MATERIAL_COMPATIBILITY_MODE
      ]
      ,
      import1.ElementRef
    ]
    ,(null as any),(null as any)),
    (l()(),import1.ɵted((null as any),['\n      '])),
      (l()(),import1.ɵeld(0,(null as any),(null as any),1,'label',[[
        'for',
        'checkbox_al'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    (l()(),import1.ɵted((null as any),['是否级联'])),
    (l()(),import1.ɵted((null as any),['\n    '])),
    (l()(),import1.ɵted((null as any),['    \n    '])),
    (l()(),import1.ɵand(8388608,(null as any),(null as any),1,(null as any),View_setMulJurisdictionDialog_1)),
    import1.ɵdid(8192,(null as any),0,import13.NgIf,[
      import1.ViewContainerRef,
      import1.TemplateRef
    ]
      ,{ngIf: [
        0,
        'ngIf'
      ]
    },(null as any)),
    (l()(),import1.ɵted((null as any),['\n  '])),
    (l()(),import1.ɵted((null as any),['\n  '])),
      (l()(),import1.ɵeld(0,(null as any),(null as any),18,'md-dialog-actions',[[
        'class',
        'mat-dialog-actions'
      ]
    ],(null as any),(null as any),(null as any),(null as any),(null as any))),
    import1.ɵdid(8192,(null as any),0,import6.MdPrefixRejector,[
      [
        2,
        import6.MATERIAL_COMPATIBILITY_MODE
      ]
      ,
      import1.ElementRef
    ]
    ,(null as any),(null as any)),
    import1.ɵdid(8192,(null as any),0,import6.MdDialogActions,([] as any[]),(null as any),(null as any)),
    (l()(),import1.ɵted((null as any),['\n    '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),5,'button',[
      [
        'class',
        'btn btn-sure mat-button'
      ]
      ,
      [
        'md-button',
        ''
      ]

    ]
      ,[[
        8,
        'disabled',
        0
      ]
    ],(null as any),(null as any),import12.View_MdButton_0,import12.RenderType_MdButton)),
    import1.ɵdid(8192,(null as any),0,import6.MdPrefixRejector,[
      [
        2,
        import6.MATERIAL_COMPATIBILITY_MODE
      ]
      ,
      import1.ElementRef
    ]
    ,(null as any),(null as any)),
    import1.ɵdid(90112,(null as any),0,import6.MdButton,[
      import1.Renderer2,
      import1.ElementRef,
      import14.Platform,
      import6.FocusOriginMonitor
    ]
      ,{disabled: [
        0,
        'disabled'
      ]
    },(null as any)),
    import1.ɵdid(8192,(null as any),0,import6.MdButtonCssMatStyler,([] as any[]),(null as any),(null as any)),
    (l()(),import1.ɵted(0,[
      '',
      ''
    ]
    )),
    import1.ɵpid(65536,import15.TranslatePipe,[
      import16.TranslateService,
      import1.ChangeDetectorRef
    ]
    ),
    (l()(),import1.ɵted((null as any),['\n    '])),
    (l()(),import1.ɵeld(0,(null as any),(null as any),6,'button',[
      [
        'class',
        'mat-button'
      ]
      ,
      [
        'md-button',
        ''
      ]
      ,
      [
        'md-dialog-close',
        ''
      ]
      ,
      [
        'type',
        'button'
      ]

    ]
    ,[
      [
        8,
        'disabled',
        0
      ]
      ,
      [
        1,
        'aria-label',
        0
      ]

    ]
      ,[[
        (null as any),
        'click'
      ]
    ],(v,en,$event) => {
      var ad:boolean = true;
      if (('click' === en)) {
        const pd_0:any = ((<any>import1.ɵnov(v,50).dialogRef.close(import1.ɵnov(v,50).dialogResult)) !== false);
        ad = (pd_0 && ad);
      }
      return ad;
    },import12.View_MdButton_0,import12.RenderType_MdButton)),
    import1.ɵdid(8192,(null as any),0,import6.MdPrefixRejector,[
      [
        2,
        import6.MATERIAL_COMPATIBILITY_MODE
      ]
      ,
      import1.ElementRef
    ]
    ,(null as any),(null as any)),
    import1.ɵdid(90112,(null as any),0,import6.MdButton,[
      import1.Renderer2,
      import1.ElementRef,
      import14.Platform,
      import6.FocusOriginMonitor
    ]
    ,(null as any),(null as any)),
    import1.ɵdid(8192,(null as any),0,import6.MdButtonCssMatStyler,([] as any[]),(null as any),(null as any)),
      import1.ɵdid(270336,(null as any),0,import6.MdDialogClose,[import6.MdDialogRef],{dialogResult: [
        0,
        'dialogResult'
      ]
    },(null as any)),
    (l()(),import1.ɵted(0,[
      '',
      ''
    ]
    )),
    import1.ɵpid(65536,import15.TranslatePipe,[
      import16.TranslateService,
      import1.ChangeDetectorRef
    ]
    ),
    (l()(),import1.ɵted((null as any),['\n  '])),
    (l()(),import1.ɵted((null as any),['\n'])),
    (l()(),import1.ɵted((null as any),['\n']))
  ]
  ,(ck,v) => {
    var co:import4.setMulJurisdictionDialog = v.component;
    ck(v,7,0);
    const currVal_8:any = co.selectedList;
    const currVal_9:any = 'all';
    const currVal_10:any = 'multiple';
    const currVal_11:any = co.data.docbase;
    ck(v,15,0,currVal_8,currVal_9,currVal_10,currVal_11);
    const currVal_24:any = 'checkbox_al';
    const currVal_25:any = 'cascade';
    ck(v,20,0,currVal_24,currVal_25);
    const currVal_26:any = 'cascade';
    const currVal_27:any = co.cascade;
    ck(v,22,0,currVal_26,currVal_27);
    const currVal_28:any = co.loading;
    ck(v,32,0,currVal_28);
    const currVal_30:any = co.loading;
    ck(v,41,0,currVal_30);
    const currVal_34:any = '';
    ck(v,50,0,currVal_34);
  },(ck,v) => {
    const currVal_0:any = import1.ɵnov(v,4).ngClassUntouched;
    const currVal_1:any = import1.ɵnov(v,4).ngClassTouched;
    const currVal_2:any = import1.ɵnov(v,4).ngClassPristine;
    const currVal_3:any = import1.ɵnov(v,4).ngClassDirty;
    const currVal_4:any = import1.ɵnov(v,4).ngClassValid;
    const currVal_5:any = import1.ɵnov(v,4).ngClassInvalid;
    const currVal_6:any = import1.ɵnov(v,4).ngClassPending;
    ck(v,0,0,currVal_0,currVal_1,currVal_2,currVal_3,currVal_4,currVal_5,currVal_6);
    const currVal_7:any = import1.ɵnov(v,7).id;
    ck(v,6,0,currVal_7);
    const currVal_12:any = import1.ɵnov(v,20).id;
    const currVal_13:any = import1.ɵnov(v,20).indeterminate;
    const currVal_14:any = import1.ɵnov(v,20).checked;
    const currVal_15:any = import1.ɵnov(v,20).disabled;
    const currVal_16:any = (import1.ɵnov(v,20).labelPosition == 'before');
    const currVal_17:any = import1.ɵnov(v,24).ngClassUntouched;
    const currVal_18:any = import1.ɵnov(v,24).ngClassTouched;
    const currVal_19:any = import1.ɵnov(v,24).ngClassPristine;
    const currVal_20:any = import1.ɵnov(v,24).ngClassDirty;
    const currVal_21:any = import1.ɵnov(v,24).ngClassValid;
    const currVal_22:any = import1.ɵnov(v,24).ngClassInvalid;
    const currVal_23:any = import1.ɵnov(v,24).ngClassPending;
    ck(v,19,1,[
      currVal_12,
      currVal_13,
      currVal_14,
      currVal_15,
      currVal_16,
      currVal_17,
      currVal_18,
      currVal_19,
      currVal_20,
      currVal_21,
      currVal_22,
      currVal_23
    ]
    );
    const currVal_29:any = (import1.ɵnov(v,41).disabled || (null as any));
    ck(v,39,0,currVal_29);
    const currVal_31:any = import1.ɵunv(v,43,0,import1.ɵnov(v,44).transform('HOME_FILEBASE_FILEINFO_OK'));
    ck(v,43,0,currVal_31);
    const currVal_32:any = (import1.ɵnov(v,48).disabled || (null as any));
    const currVal_33:any = import1.ɵnov(v,50).ariaLabel;
    ck(v,46,0,currVal_32,currVal_33);
    const currVal_35:any = import1.ɵunv(v,51,0,import1.ɵnov(v,52).transform('HOME_FILEBASE_FILEINFO_CANCEL'));
    ck(v,51,0,currVal_35);
  });
}
function View_setMulJurisdictionDialog_Host_0(l:any):import1.ɵViewDefinition {
  return import1.ɵvid(0,[
    (l()(),import1.ɵeld(0,(null as any),(null as any),1,'set-mulimits-jurisdiction',([] as any[]),(null as any),(null as any),(null as any),View_setMulJurisdictionDialog_0,RenderType_setMulJurisdictionDialog)),
    import1.ɵdid(57344,(null as any),0,import4.setMulJurisdictionDialog,[
      import9.GroupService,
      import11.UserService,
      import17.FileBaseService,
      import6.MdDialogRef,
      import10.ToastsManager,
      import6.MD_DIALOG_DATA
    ]
    ,(null as any),(null as any))
  ]
  ,(ck,v) => {
    ck(v,1,0);
  },(null as any));
}
export const setMulJurisdictionDialogNgFactory:import1.ComponentFactory<import4.setMulJurisdictionDialog> = import1.ɵccf('set-mulimits-jurisdiction',import4.setMulJurisdictionDialog,View_setMulJurisdictionDialog_Host_0,{},{},([] as any[]));
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL3p6ZC93ZWJTdG9ybS9lZG1zL3RydW5rL2VkbXMvc3JjL2FwcC9ob21lL2ZpbGVCYXNlL2RpYWxvZy9zZXRNdWxKdXJpc2RpY3Rpb24vc2V0TXVsSnVyaXNkaWN0aW9uLmRpYWxvZy5uZ2ZhY3RvcnkudHMiLCJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJuZzovLy9Vc2Vycy96emQvd2ViU3Rvcm0vZWRtcy90cnVuay9lZG1zL3NyYy9hcHAvaG9tZS9maWxlQmFzZS9kaWFsb2cvc2V0TXVsSnVyaXNkaWN0aW9uL3NldE11bEp1cmlzZGljdGlvbi5kaWFsb2cudHMiLCJuZzovLy9Vc2Vycy96emQvd2ViU3Rvcm0vZWRtcy90cnVuay9lZG1zL3NyYy9hcHAvaG9tZS9maWxlQmFzZS9kaWFsb2cvc2V0TXVsSnVyaXNkaWN0aW9uL3NldC1tdWxsaW1pdHMtanVyaXNkaWN0aW9uLmh0bWwiLCJuZzovLy9Vc2Vycy96emQvd2ViU3Rvcm0vZWRtcy90cnVuay9lZG1zL3NyYy9hcHAvaG9tZS9maWxlQmFzZS9kaWFsb2cvc2V0TXVsSnVyaXNkaWN0aW9uL3NldE11bEp1cmlzZGljdGlvbi5kaWFsb2cudHMuc2V0TXVsSnVyaXNkaWN0aW9uRGlhbG9nX0hvc3QuaHRtbCJdLCJzb3VyY2VzQ29udGVudCI6WyIgIiwiPGZvcm0gbmFtZT1cImZvcm1cIiAobmdTdWJtaXQpPVwiZi5mb3JtLnZhbGlkICYmIHNldEp1cmlzZGljdGlvbigpXCIgI2Y9XCJuZ0Zvcm1cIiBub3ZhbGlkYXRlPlxuICA8aDIgbWQtZGlhbG9nLXRpdGxlPuaJuemHj+S/ruaUueadg+mZkDwvaDI+XG4gIDxtZC1kaWFsb2ctY29udGVudCA+XG4gICAgPG11bHRpLWp1cmlzZGljdGlvblxuICAgICAgW2RvY2Jhc2VdPVwiZGF0YS5kb2NiYXNlXCJcbiAgICAgIFtzZWxlY3RUeXBlXT1cIidtdWx0aXBsZSdcIlxuICAgICAgW3R5cGVdPVwiJ2FsbCdcIlxuICAgICAgW3NlbGVjdGVkTGlzdF09XCJzZWxlY3RlZExpc3RcIlxuICAgID48L211bHRpLWp1cmlzZGljdGlvbj5cbiAgICA8ZGl2PlxuICAgICAgPG1kLWNoZWNrYm94IGlkPVwiY2hlY2tib3hfYWxcIiBuYW1lPVwiY2FzY2FkZVwiIFsobmdNb2RlbCldPVwiY2FzY2FkZVwiPjwvbWQtY2hlY2tib3g+XG4gICAgICA8bGFiZWwgZm9yPVwiY2hlY2tib3hfYWxcIj7mmK/lkKbnuqfogZQ8L2xhYmVsPlxuICAgIDwvZGl2PiAgICBcbiAgICA8bG9hZGluZy1tZXNzYWdlICpuZ0lmPVwibG9hZGluZ1wiID48L2xvYWRpbmctbWVzc2FnZT5cbiAgPC9tZC1kaWFsb2ctY29udGVudD5cbiAgPG1kLWRpYWxvZy1hY3Rpb25zPlxuICAgIDxidXR0b24gbWQtYnV0dG9uIFtkaXNhYmxlZF09XCJsb2FkaW5nXCIgY2xhc3M9XCJidG4gYnRuLXN1cmVcIj57eyAnSE9NRV9GSUxFQkFTRV9GSUxFSU5GT19PSycgfCB0cmFuc2xhdGV9fTwvYnV0dG9uPlxuICAgIDxidXR0b24gbWQtYnV0dG9uIG1kLWRpYWxvZy1jbG9zZSA+e3sgJ0hPTUVfRklMRUJBU0VfRklMRUlORk9fQ0FOQ0VMJyB8IHRyYW5zbGF0ZX19PC9idXR0b24+XG4gIDwvbWQtZGlhbG9nLWFjdGlvbnM+XG48L2Zvcm0+XG4iLCI8c2V0LW11bGltaXRzLWp1cmlzZGljdGlvbj48L3NldC1tdWxpbWl0cy1qdXJpc2RpY3Rpb24+Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNhSTtnQkFBQTs7O0lBQUE7Ozs7O0lBYko7TUFBQTtRQUFBO1FBQUE7TUFBQTs7TUFBQTtRQUFBO1FBQUE7TUFBQTs7SUFBQTtLQUFBO01BQUE7UUFBQTtRQUFBO1FBQUE7TUFBQTs7TUFBQTtRQUFBO1FBQUE7UUFBQTtNQUFBOztNQUFBO1FBQUE7UUFBQTtRQUFBO01BQUE7O01BQUE7UUFBQTtRQUFBO1FBQUE7TUFBQTs7TUFBQTtRQUFBO1FBQUE7UUFBQTtNQUFBOztNQUFBO1FBQUE7UUFBQTtRQUFBO01BQUE7O01BQUE7UUFBQTtRQUFBO1FBQUE7TUFBQTs7SUFBQTtLQUFBO01BQUE7UUFBQTtRQUFBO01BQUE7O01BQUE7UUFBQTtRQUFBO01BQUE7O01BQUE7UUFBQTtRQUFBO01BQUE7O0lBQUE7S0FBQTtNQUFBO01BQUE7TUFBQTtRQUFBO1FBQUE7TUFBQTtNQUFBO1FBQUE7UUFBQTtNQUFBO01BQWtCO1FBQUE7UUFBQTtNQUFBO01BQWxCO0lBQUE7Z0JBQUE7a0JBQUE7UUFBQTtRQUFBO01BQUE7SUFBQTtNQUFBO1FBQUE7UUFBQTtNQUFBOztNQUFBO1FBQUE7UUFBQTtNQUFBOztJQUFBO0tBQUE7Z0JBQUE7Z0JBQUE7SUFBd0Y7SUFDdEY7TUFBQTtRQUFBO1FBQUE7TUFBQTs7TUFBQTtRQUFBO1FBQUE7TUFBQTs7SUFBQTtPQUFBO1FBQUE7UUFBQTtRQUFBO01BQUE7SUFBQTtrQkFBQTtRQUFBOztNQUFBO0lBQUE7SUFBb0I7SUFBVztNQUMvQjtRQUFBO1FBQUE7TUFBQTtJQUFBO2dCQUFBO01BQUE7UUFBQTs7TUFBQTs7O0lBQUE7S0FBQTtnQkFBQTtJQUFvQjtJQUNsQjtnQkFBQTs7OztJQUFBO0tBQUE7TUFBQTtRQUFBO1FBQUE7TUFBQTs7TUFBQTtRQUFBO1FBQUE7TUFBQTs7TUFBQTtRQUFBO1FBQUE7TUFBQTs7TUFBQTtRQUFBO1FBQUE7TUFBQTs7SUFBQTtLQUFBO0lBS3NCO0lBQ3RCO0lBQUs7SUFDSDtNQUFBO1FBQUE7UUFBQTtNQUFBOztNQUFBO1FBQUE7UUFBQTtNQUFBOztNQUFBO1FBQUE7UUFBQTtNQUFBOztJQUFBO0tBQUE7TUFBQTtRQUFBO1FBQUE7UUFBQTtNQUFBOztNQUFBO1FBQUE7UUFBQTtRQUFBO01BQUE7O01BQUE7UUFBQTtRQUFBO1FBQUE7TUFBQTs7TUFBQTtRQUFBO1FBQUE7UUFBQTtNQUFBOztNQUFBO1FBQUE7UUFBQTtRQUFBO01BQUE7O01BQUE7UUFBQTtRQUFBO1FBQUE7TUFBQTs7TUFBQTtRQUFBO1FBQUE7UUFBQTtNQUFBOztNQUFBO1FBQUE7UUFBQTtRQUFBO01BQUE7O01BQUE7UUFBQTtRQUFBO1FBQUE7TUFBQTs7TUFBQTtRQUFBO1FBQUE7UUFBQTtNQUFBOztNQUFBO1FBQUE7UUFBQTtRQUFBO01BQUE7O01BQUE7UUFBQTtRQUFBO1FBQUE7TUFBQTs7SUFBQTtPQUFBO1FBQUE7UUFBQTtNQUFBO0lBQUE7TUFBQTtNQUFBO01BQTZDO1FBQUE7UUFBQTtNQUFBO01BQTdDO0lBQUE7Z0JBQUE7Ozs7O0lBQUE7S0FBQTtNQUFBO1FBQUE7UUFBQTtNQUFBOztNQUFBO1FBQUE7UUFBQTtNQUFBOztJQUFBO0tBQUE7Z0JBQUE7TUFBQTtJQUFBO2dCQUFBO01BQUE7UUFBQTs7TUFBQTs7TUFBQTtRQUFBO1FBQUE7TUFBQTs7TUFBQTtRQUFBO1FBQUE7TUFBQTs7TUFBQTtRQUFBOztNQUFBOztJQUFBO0tBQUE7TUFBQTtRQUFBO1FBQUE7TUFBQTs7TUFBQTtRQUFBO1FBQUE7TUFBQTs7SUFBQTtLQUFBO2dCQUFBO2dCQUFBO2dCQUFBO01BQUE7UUFBQTs7TUFBQTs7O0lBQUE7S0FBQTtJQUFpRjtNQUNqRjtRQUFBO1FBQUE7TUFBQTtJQUFBO0lBQXlCO0lBQVk7SUFDakM7SUFDTjtnQkFBQTs7O0lBQUE7T0FBQTtRQUFBO1FBQUE7TUFBQTtJQUFBO0lBQW9EO0lBQ2xDO01BQ3BCO1FBQUE7UUFBQTtNQUFBO0lBQUE7Z0JBQUE7TUFBQTtRQUFBOztNQUFBOzs7SUFBQTtLQUFBO2dCQUFBO0lBQW1CO0lBQ2pCO01BQUE7UUFBQTtRQUFBO01BQUE7O01BQUE7UUFBQTtRQUFBO01BQUE7O0lBQUE7T0FBQTtRQUFBO1FBQUE7UUFBQTtNQUFBO0lBQUE7Z0JBQUE7TUFBQTtRQUFBOztNQUFBOzs7SUFBQTtLQUFBO2dCQUFBOzs7OztJQUFBO09BQUE7UUFBQTtRQUFBO01BQUE7SUFBQTtnQkFBQTtJQUE0RDtNQUFBO01BQUE7SUFBQTtJQUFBO2dCQUFBOzs7SUFBQTtJQUFBO0lBQXFEO0lBQ2pIO01BQUE7UUFBQTtRQUFBO01BQUE7O01BQUE7UUFBQTtRQUFBO01BQUE7O01BQUE7UUFBQTtRQUFBO01BQUE7O01BQUE7UUFBQTtRQUFBO01BQUE7O0lBQUE7S0FBQTtNQUFBO1FBQUE7UUFBQTtRQUFBO01BQUE7O01BQUE7UUFBQTtRQUFBO1FBQUE7TUFBQTs7SUFBQTtPQUFBO1FBQUE7UUFBQTtNQUFBO0lBQUE7TUFBQTtNQUFBO1FBQUE7UUFBQTtNQUFBO01BQUE7SUFBQTtnQkFBQTtNQUFBO1FBQUE7O01BQUE7OztJQUFBO0tBQUE7Z0JBQUE7Ozs7O0lBQUE7S0FBQTtnQkFBQTtrQkFBQTtRQUFBO1FBQUE7TUFBQTtJQUFBO0lBQW1DO01BQUE7TUFBQTtJQUFBO0lBQUE7Z0JBQUE7OztJQUFBO0lBQUE7SUFBeUQ7SUFDMUU7SUFDZjs7OztJQWxCTDtJQU1JO0lBREE7SUFEQTtJQURBO0lBREYsVUFJRSxVQURBLFVBREEsV0FEQSxVQURGO0lBT2U7SUFBaUI7SUFBOUIsVUFBYSxXQUFpQixVQUE5QjtJQUE4QjtJQUFlO0lBQTdDLFVBQThCLFdBQWUsVUFBN0M7SUFHZTtJQUFqQixVQUFpQixVQUFqQjtJQUdrQjtJQUFsQixVQUFrQixVQUFsQjtJQUNrQjtJQUFsQixVQUFrQixVQUFsQjs7SUFqQko7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQSxTQUFBLHFFQUFBO0lBQ0U7SUFBQSxTQUFBLFNBQUE7SUFTSTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtJQUFBO0lBQUE7SUFBQTtNQUFBO01BQUE7TUFBQTtNQUFBO01BQUE7TUFBQTtNQUFBO01BQUE7TUFBQTtNQUFBO01BQUE7TUFBQTtJQUFBO0lBQUE7SUFNRjtJQUFBLFVBQUEsVUFBQTtJQUE0RDtJQUFBO0lBQzVEO0lBQUE7SUFBQSxVQUFBLFdBQUEsVUFBQTtJQUFtQztJQUFBOzs7OztJQ2pCdkM7Z0JBQUE7Ozs7Ozs7SUFBQTtLQUFBOzs7SUFBQTs7OyJ9

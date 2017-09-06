/**
 * @fileoverview This file is generated by the Angular template compiler.
 * Do not edit.
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride}
 */
 /* tslint:disable */


export const styles:any[] = ['@charset "utf-8";\n.container[_ngcontent-%COMP%]{\n  perspective:1000;\n  -moz-transform: perspective(1000px);\n  transform-style:preserve-3d;\n  //float:left;\n  padding-left: 0;\n  padding-right: 0;\n}\n.container[_ngcontent-%COMP%], .front[_ngcontent-%COMP%], .back[_ngcontent-%COMP%]{\n  width:290px;\n  //height:432px;\n  margin-right: 15px;\n  margin-bottom: 15px;\n  border-radius: 2px;\n  //background: #ffffff;\n  &:nth-child(3n+0){\n    margin-right: 0;\n  }\n  .public--nav--box{\n    padding: 20px 0 20px 20px;\n    .public--nav__a{\n      display: inline-block;\n      font-size: 13px;\n      //color: #999;\n      color: #ffffff;\n      width: 140px;\n      padding: 5px 0;\n      .fa{\n        padding-right: 8px;\n      }\n    }\n  }\n}\n.flip[_ngcontent-%COMP%]{\n  position:relative;\n  transition:0.6s;\n  transform-style:preserve-3d;\n}\n.front[_ngcontent-%COMP%], .back[_ngcontent-%COMP%]{\n  position:absolute;\n  top: 0;\n  left: 0;\n  backface-visibility:hidden;\n  -moz-backface-visibility:hidden;\n  -ms-backface-visibility:hidden;\n  width: 100%;\n  height: 100%;\n}\n.front[_ngcontent-%COMP%]{\n  transform: rotateY(0deg);\n  width: 210px;\n  height: 430px;\n  //border:1px solid transparent;\n  //background: #ffffff;\n  @media (max-width: 1366px) {\n    height: 373px;\n    width: 200px;\n  }\n}\n.back[_ngcontent-%COMP%]{\n  transform:rotateY(-180deg);\n  //background: transparent !important;\n  //border:1px solid #cccccc\n}\n.container[_ngcontent-%COMP%]:hover   .flip[_ngcontent-%COMP%]{\n  transform:rotateY(180deg);\n\n}\n\n//[_ngcontent-%COMP%]   .flip[_ngcontent-%COMP%]:hover   .front[_ngcontent-%COMP%]{\n//   backface-visibility:hidden;\n//   -moz-backface-visibility:hidden;\n//   -ms-backface-visibility:hidden;\n// }\n//[_ngcontent-%COMP%]   .front[_ngcontent-%COMP%]:hover{\n//   .head{\n//     visibility: hidden;\n//   }\n// }\n//[_ngcontent-%COMP%]   .flip[_ngcontent-%COMP%]:hover   .back[_ngcontent-%COMP%]{\n//   //-webkit-transform: rotateY(180deg);\n//   //-moz-transform: rotateY(180deg);\n//   //-o-transform: rotateY(180deg);\n//   //-ms-transform: rotateY(180deg);\n//   //transform: rotateY(180deg);\n//   z-index: 4;\n//   backface-visibility:visible;\n//   -moz-backface-visibility:visible;\n//   -ms-backface-visibility:visible;\n//   background: #008efa;\n// }\n\n.normalContainer[_ngcontent-%COMP%] {\n  width:292px;\n  height:222px;\n  background: #ffffff;\n  float:left;\n  padding: 20px;\n  margin-right: 15px;\n  margin-bottom: 15px;\n  border-radius: 2px;\n  //&:nth-child(3n+0){\n  //  margin-right: 0;\n  //}\n  &.small--card{\n    width: 190px;\n    height: 190px !important;\n    @media (max-width: 1366px){\n      height: 168px !important;\n      width: 168px !important;\n    }\n  }\n}\n\n.main--wrap[_ngcontent-%COMP%]{\n  width: 100%;\n  height: 100%;\n  //background: #e5e5e5;\n  //background: url(../images/buss.png) ;\n  //background: url(../images/main--banner.jpg) ;\n  //background: url(../images/center.jpg) ;\n  background: url(../../assets/images/main-banner3.jpg) ;\n  //background: url(../images/blue--bgg.jpg) ;\n  background-size: cover;\n}\n.main--navbar--wrap[_ngcontent-%COMP%]{\n  width: 100%;\n  //background: url(../images/navbar--bg.png) repeat-x;\n  //background-size: contain;\n  //padding-bottom: 10px;\n  //background: rgba(0, 0, 0,.5);\n  .main--navbar--box{\n    width: 1024px;\n    margin: 0 auto;\n    height: 50px;\n    line-height: 50px;\n    @media (max-width: 1366px) {\n      width: 946px;\n    }\n    .logo{\n      display: inline-block;\n      vertical-align: middle;\n      width: 145px;\n      height: 32px;\n      background: url(../../assets/images/logo.png) no-repeat;\n      //border-right: 2px solid #eeeeee;\n\n    }\n    .link{\n      display: inline-block;\n      vertical-align: middle;\n      line-height: normal;\n      padding-left: 20px;\n      //border-left: 2px solid #eeeeee;\n      margin-bottom: 0;\n      //margin-left: 10px;\n      font-size: 0;\n      li{\n        display: inline-block;\n        vertical-align: middle;\n        height: 100%;\n        //color: #999;\n        color: #ffffff;\n        font-weight: bold;\n        font-size: 15px;\n        margin-right: 10px;\n        &:last-child{\n          margin-right: 0;\n        }\n      }\n    }\n    //.cloud{\n    //  display: inline-block;\n    //  width: 50px;\n    //  height: 50px;\n    //  background: url(../images/doc--cloud.png) no-repeat;\n    //}\n    .login--out--btn{\n      color: #ffffff;\n    }\n  }\n}\n.main--content--wrap[_ngcontent-%COMP%]{\n  //background: url(../images/main-banner.jpg) ;\n  //background-size: cover;\n  //height: calc(100% - 50px);\n  height: 580px;\n  width: 1024px;\n  position:absolute;\n  top:50%;\n  left: 50%;\n  margin-top:-290px;\n  margin-left: -512px;\n  @media (max-width: 1366px) {\n    width: 946px;\n    margin-left: -473px;\n  }\n  .main--footer{\n    height: 40px;\n    line-height: 40px;\n    background: rgba(0,0,0,.8);\n    width: 100%;\n    text-align: center;\n    color: #ffffff;\n    position: fixed;\n    left: 0;\n    bottom: 0;\n  }\n}\n.search--wrap[_ngcontent-%COMP%]{\n  width: 100%;\n  height: 100px;\n  //background: url(../images/main-banner.jpg) ;\n  //background-size: cover;\n  //background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0.6) 50%, transparent);\n  position: relative;\n  .logo{\n    display: inline-block;\n    vertical-align: middle;\n    width: 158px;\n    height: 40px;\n    background: url(../../assets/images/logo--40.png) no-repeat;\n    position: absolute;\n    right: 0;\n  }\n  .search--title{\n    width: 100px;\n    text-align: center;\n    margin: 0 auto;\n    font-size: 20px;\n    color: #fff;\n    padding-top: 60px;\n    //width: 100px;\n    //height: 50px;\n    //position: absolute;\n    //top: 25px;\n    //left: 50px;\n    //margin-top: -25px;\n    //margin-left: -50px;\n  }\n  .search--box{\n    width: 100%;\n    margin: 0 auto;\n    height: 52px;\n    line-height: 52px;\n    //background: rgba(255, 255, 255, .5);\n    //position: absolute;\n    //bottom: 0;\n    //left: 0;\n    //right: 0;\n    //text-align: center;\n    margin-top: 20px;\n    position: relative;\n    .search-input--box{\n      position: relative;\n      width: 600px;\n      height: 42px;\n      display: inline-block;\n    }\n    .search--input{\n      position: absolute;\n      right: 15px;\n      z-index: 2;\n      height: 42px;\n      line-height: 42px;\n      &:hover{\n        cursor: pointer;\n        .fa-search{\n          color: #333333;\n        }\n      }\n      .fa-search{\n        color: #999;\n        font-size: 16px;\n      }\n    }\n    input{\n      width: 600px;\n      display: inline-block;\n      //padding-left: 23px;\n      padding-right: 43px;\n      border-radius: 3px;\n      //height: 52px;\n      //line-height: 52px;\n      height: 42px;\n      //line-height: 42px;\n      position: absolute;\n      left: 0;\n    }\n  }\n\n}\n.card--wrap[_ngcontent-%COMP%]{\n  width: 1024px;\n  margin: 0 auto;\n  //margin-top: 50px;\n  @media (max-width: 1366px) {\n    width: 946px;\n  }\n  .left--content{\n    display: inline-block;\n    vertical-align: middle;\n    width: 615px;\n    @media (max-width: 1366px) {\n      width: 550px;\n    }\n  }\n  .middle--content{\n    display: inline-block;\n    vertical-align: middle;\n    //margin-right:0 ;\n    width: 210px;\n    margin-right: 15px;\n    @media (max-width: 1366px) {\n      width: 200px;\n    }\n  }\n  .right--content{\n    display: inline-block;\n    vertical-align: middle;\n    margin-right:0 ;\n    width: 180px;\n  }\n  .front{\n    //background: rgba(0,120,215,.8) !important;\n    &:hover{\n      //background: rgba(0,120,215,1) !important;\n      opacity: .8;\n      cursor: pointer;\n    }\n  }\n  .back{\n    width: 210px;\n    height: 430px;\n    background: #008efa;\n    color: #ffffff !important;\n    box-shadow: 0 20px 25px -12px rgba(0, 0, 0, 0.4);\n    @media (max-width: 1366px) {\n      height: 373px;\n      width: 200px;\n    }\n  }\n  .single--card--box{\n    position: relative;\n    box-shadow: 0 20px 25px -12px rgba(0, 0, 0, 0.4);\n    //background: rgba(0,120,215,1) !important;\n    //background: #ffffff !important;\n    transition: 0.3s linear all; -webkit-transition: 0.3s linear all;\n    height: 222px ;\n    @media (max-width: 1366px){\n        height: 190px;\n      width: 260px;\n    }\n    &:hover{\n      //background: rgba(0,120,215,1) !important;\n      //background: rgba(0,120,215,.7) !important;\n      opacity: .8;\n      cursor: pointer;\n      transform: translate3d(0,-7px,0);\n      box-shadow: 0 7px 21px rgba(0,0,0,.15);\n      .decorate--icon, .title {\n        color: #ffffff !important;\n      }\n    }\n    //&:nth-child(3n+0){\n    //  margin-right: 0;\n    //}\n    &.big--card{\n      height: 430px;\n      margin-bottom: 0;\n      &:hover{\n        transform: none;\n        opacity: 1;\n      }\n      @media (max-width: 1366px) {\n        height: 373px;\n        width: 200px;\n      }\n    }\n    &.right--card{\n      width: 190px;\n      height: 133px;\n      margin-right: 0;\n      @media (max-width: 1366px) {\n        height: 114.5px;\n        width: 175px;\n      }\n      &:last-child{\n        margin-bottom: 0;\n      }\n    }\n    .head{\n      width: 120px;\n      height: 60px;\n      position: absolute;\n      top: 40%;\n      left: 50%;\n      margin-top: -30px;\n      margin-left: -60px;\n      text-align: center;\n      &.public--nav{\n        display: inline-block;\n        padding: 20px 0 0 20px;\n        width: 100%;\n      }\n      .title{\n        display: inline-block;\n        font-size: 18px;\n        //color: #999;\n        color: #ffffff;\n        &.object--doc--title{\n          position: relative;\n          top: -12px;\n        }\n      }\n      .zn--title{\n        color: #ffffff;\n        line-height: normal;\n        font-size: 0;\n        transform: scale(.8,.8);\n        margin-left: -25px;\n      }\n      .more--btn{\n        position: absolute;\n        top: 22px;\n        right: 15px;\n        color: #999;\n        font-size: 0;\n      }\n      .decorate--icon{\n        //position: absolute;\n        //bottom: 20px;\n        //right: 20px;\n        display: block;\n        //color: #999;\n        color: #ffffff;\n        font-size: 53px;\n        margin-bottom: 10px;\n        //padding-right: 10px;\n        //font-size: 0;\n        &.superstar{\n          width: 47px;\n          height: 59px;\n          background: url(../../assets/images/chaoxing.png) no-repeat center;\n          position: relative;\n          left: 33px;\n        }\n        &.company--doc{\n          width: 56px;\n          height: 60px;\n          background: url(../../assets/images/university--icon.png) no-repeat center;\n          position: relative;\n          left: 33px;\n        }\n        &.object--doc{\n          width: 60px;\n          height: 74px;\n          background: url(../../assets/images/object--icon.png) no-repeat center;\n          position: relative;\n          top: -7px;\n          left: 33px;\n        }\n      }\n    }\n  }\n}'];
//# sourceMappingURL=data:application/json;base64,eyJmaWxlIjoiL1VzZXJzL3p6ZC93ZWJTdG9ybS9lZG1zL3RydW5rL2VkbXMvc3JjL2FwcC9tYWluL21haW4uY29tcG9uZW50LnNjc3Muc2hpbS5uZ3N0eWxlLnRzIiwidmVyc2lvbiI6Mywic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmc6Ly8vVXNlcnMvenpkL3dlYlN0b3JtL2VkbXMvdHJ1bmsvZWRtcy9zcmMvYXBwL21haW4vbWFpbi5jb21wb25lbnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiICJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OyJ9

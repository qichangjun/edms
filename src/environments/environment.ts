// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //baseUrl : 'http://mvn.docworks.cn:9092/mockjsdata/8',
  //baseUrl : 'http://demo.docworks.cn/edmsapi',
  //baseUrl : 'http://192.168.0.153:8080',
  baseUrl : 'http://192.168.0.208:8080/edmsapi',
  companyBase : 'wison_company',
  projectBase : 'wison_projects',
  mainHref : {
    kmsDoc : 'http://kmdoc.wison.com/kms/component/main?tabFrameId=expertuiframe',
    dcOnline : 'http://dconline.wison.com',
    share : 'http://share.wison.com',
    bz : 'http://bz.wison.com',
    zhiWang : 'http://zhiwang.wison.com/kns50',
    markBook : 'http://zhiwang.wison.com:8080/markbook/GetIndex.jsp',
    InternationalItem : 'http://edms.wison.com/folder?objectId=0b01e24080477dd1',
    domesticItem : 'http://edms.wison.com/folder?objectId=0b01e24080477dd2',
    caseBase : 'http://edms.wison.com/folder?objectId=0b01e2408002490b',
    thesisBase : 'http://edms.wison.com/folder?objectId=0b01e24080002f47',
    archivesList : 'http://edms.wison.com/folder?objectId=0c0004d2800680dd',
    EnterpriseTemplate : 'http://edms.wison.com/folder?objectId=0b01e24080003110',
    EnterpriseBase : 'http://edms.wison.com/folder?objectId=0c01e24080001fcd',
    completeCertificate : 'http://edms.wison.com/folder?objectId=0c01e24080001fcd',
    exchangeShare : 'http://edms.wison.com/folder?objectId=0b01e2408036d433',
    intelligenceInfo : 'http://edms.wison.com/folder?objectId=0b01e240804a8699',
    companyProfile : 'http://edms.wison.com/folder?objectId=0b01e240803cb4f4',
    businessConstruction : 'http://edms.wison.com/folder?objectId=0b01e24080002f1f',
    fullSearch : 'http://kmdoc.wison.com/wisonsearch/#!/searchResult?docbase=wison_company&keywords='
  }
  //baseUrl : 'http://demo.docworks.cn/adminapi'
};

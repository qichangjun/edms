import { Injectable } from '@angular/core';

@Injectable()
export class ApiUrlService {
  loginApi = '/user/login';
  getBreadCrumb = '/navigation/breadcrumbs';
  getTreeData = '/org/list_sub_orgs';
  getTreeDataPaths = '/navigation/treeNodes';
  getFileList = '/navigation/list';
  upload = '/resource/upload';
  getDeleteInfo = '/resource/delete_types';
  deleteFile = '/resource/delete';
  searchIdsByPosition = '/resource/location_detail';
  setMulJurisdiction = '/permit/update_batch';
  getVersionList = '/version/list';
  download = '/resource/download';
  getShowObJ = '/user/show_is_hidden';
  changeShowObJ = '/user/update_hidden';
  checkAttrList = '/attribute/list';
  getInfo = '/attribute/get_attributes';

  move = '/resource/move';
  copy = '/resource/copy';
  link = '/resource/link';

  newFolder = '/folder/create';
  newFileCabinet = '/resource/create_cabinet';

  getPosition = '/resource/list_locations';

  getUserList = '/user/list';
  createUser = '/user/create';
  removeUser = '/user/delete';
  updateUser = '/user/update';

  getGroupList = '/group/list';
  createGroup = '/group/create';
  updateGroup = '/group/update';
  removeGroup = '/group/delete';
}

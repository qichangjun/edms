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
  updateLimit = '/permit/update_single';
  getVersionList = '/version/list';
  download = '/resource/download';
  getShowObJ = '/user/show_is_hidden';
  changeShowObJ = '/user/update_hidden';
  checkAttrList = '/attribute/list';
  getInfo = '/attribute/get_attributes';
  updateInfo = '/attribute/update_single';
  exportLimits = '/permit/export';
  getLimit = '/permit/list'
  getUserAndGroupList = '/user/list'
  getGroupsChildren = '/group/listAllSubObjects'
  getListTypes='/attribute/list_types'
  setMulPro = '/attribute/update_batch'

  move = '/resource/move';
  copy = '/resource/copy';
  link = '/resource/link';

  newFolder = '/resource/create_folder';
  newFileCabinet = '/resource/create_cabinet';

  getPosition = '/resource/list_locations';

  getUserList = '/user/list';
  createUser = '/user/create';
  removeUser = '/user/delete';
  updateUser = '/user/update';
  removeMember = '/group/remove_members';
  addMember = '/group/add_members';

  getGroupList = '/group/list';
  createGroup = '/group/create';
  updateGroup = '/group/update';
  removeGroup = '/group/delete';
  checkUsersGroup = '/user/list_groups';
  reAssignUser = '/user/reassign'
}

import axios from '@/plugin/axios';

/**
 * @description 接口管理
 * https://wiki.imgo.tv/pages/viewpage.action?pageId=20653211
 */

/**
 * @description 机位管理 查询
 */
export const GET_MACHINE_FILE = function(opts) {
  return axios.post('/api/machine/list', opts);
};

/**
 * @description 机位管理 提交编码
 */
export const GET_MACHINE_SUBMIT = function(opts) {
  return axios.post('/api/machine/submit', opts);
};

/**
 * @description 模版管理 查询
 */
export const GET_TEMP_LIST = function(opts) {
  return axios.post('/api/template/list', opts);
};

/**
 * @description 模版管理 新增
 */
export const GET_TEMP_ADD = function(opts) {
  return axios.post('/api/template/add', opts);
};
/**
 * @description 模版管理 修改
 */
export const GET_TEMP_UPDATE = function(opts) {
  return axios.post('/api/template/update', opts);
};
/**
 * @description 模版管理 删除
 */
export const GET_TEMP_DEL = function(opts) {
  return axios.post('/api/template/del', opts);
};

/**
 * @description 模版管理 查询
 */
export const GET_CODE_LIST = function(opts) {
  return axios.post('/api/code/list', opts);
};

/**
 * @description 模版管理 新增
 */
export const GET_CODE_ADD = function(opts) {
  return axios.post('/api/code/add', opts);
};
/**
 * @description 模版管理 修改
 */
export const GET_CODE_UPDATE = function(opts) {
  return axios.post('/api/code/update', opts);
};
/**
 * @description 模版管理 删除
 */
export const GET_CODE_DEL = function(opts) {
  return axios.post('/api/code/del', opts);
};

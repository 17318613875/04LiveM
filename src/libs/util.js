/*
 * @Description: util
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-10-25 09:45:57
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-25 09:52:03
 */
import cookies from './util.cookies';
import db from './util.db';
import log from './util.log';

const util = {
  cookies,
  db,
  log,
};

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function(titleText) {
  const processTitle = process.env.VUE_APP_TITLE || '';
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`;
};

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function(url) {
  var a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('target', '_blank');
  a.setAttribute('id', 'd2admin-link-temp');
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(document.getElementById('d2admin-link-temp'));
};
util.uuidGenerator = function() {
  var originStr = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
  var originChar = '0123456789abcdef';
  var len = originChar.length;
  return originStr.replace(/x/g, function() {
    return originChar.charAt(Math.floor(Math.random() * len));
  });
};

export default util;

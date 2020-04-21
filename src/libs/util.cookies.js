/*
 * @Description: cookIT
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-08-26 18:27:40
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-25 15:35:26
 */
import Cookies from 'js-cookie'

const cookies = {}

function GetCookieDomain () {
  var host = location.hostname
  var ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  if (ip.test(host) === true || host === 'localhost') return host
  var regex = /([^]*).*/
  var match = host.match(regex)
  if (typeof match !== 'undefined' && match !== null) host = match[1]
  if (typeof host !== 'undefined' && host !== null) {
    var strAry = host.split('.')
    if (strAry.length > 1) {
      host = strAry[strAry.length - 2] + '.' + strAry[strAry.length - 1]
    }
  }
  return '.' + host
}
let currentCookieSetting = {
  expires: 15,
  domain: GetCookieDomain(),
  path: '/'
}
/**
     * @description 存储 cookie 值
     * @param {String} name cookie name
     * @param {String} value cookie value
     * @param {Object} setting cookie setting
     */
cookies.set = function (name = 'default', value = '', cookieSetting = {}) {
  Object.assign(currentCookieSetting, cookieSetting)
  Cookies.set(name, value, currentCookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
cookies.get = function (name = 'default') {
  return Cookies.get(name)
}

/**
 * @description 拿到 cookie 全部的值
 */
cookies.getAll = function () {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
cookies.remove = function (name = 'default') {
  return Cookies.remove(name, currentCookieSetting)
}

export default cookies

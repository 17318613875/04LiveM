/*
 * @Description: models
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-10-01 14:18:16
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-25 14:37:36
 */
/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('./model', false, /\.js$/)
const modules = {}

files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

export default {
  ...modules
}

<!--
 * @Description:app
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-08-26 18:27:40
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-25 14:28:50
 -->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  provide: {
    dailogWidth: '840px',
    labelWidth: '120px'
  }
}
</script>

<style lang="scss" >
@import '~@/assets/style/public-class.scss';
  .el-input.is-disabled .el-input__inner,.el-textarea.is-disabled .el-textarea__inner{
      color: #606266 !important;
}
.el-checkbox.is-bordered+.el-checkbox.is-bordered{
  margin-left: 0px !important;
      margin-bottom: 10px;
}
.el-tag{
  margin-right: 4px;
}
.abow_dialog {
    display: flex;
    justify-content: center;
    align-items: Center;
    overflow: hidden;
    .el-dialog {
        margin: 0 auto !important;
        height: 80%;
        overflow: hidden;
        .el-dialog__body {
            position: absolute;
            left: 0;
            top: 54px;
            bottom: 0;
            right: 0;
            z-index: 1;
            overflow: hidden;
            overflow-y: auto;
        }
    }
}
.avatar {
  width: auto;
  height: 100%;
}
.cell-cursor{
      color: #409EFF;
      cursor: pointer;
}
.d2-container-full__body{
      overflow: visible;
}
.tableDiv{
  height:100%;
  .tableDiv-header{
    height: 40px;
  }
}
.d2-container-full__body{
  padding: 10px !important;
}

::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
background-color:#f8f8f8;
}
::-webkit-scrollbar {//滚动条的宽度
width:8px;
height:8px;
}
::-webkit-scrollbar-thumb {//滚动条的设置
background-color:#dddddd;
background-clip:padding-box;
min-height:28px;
}
::-webkit-scrollbar-thumb:hover {
background-color:#bbb;
}
.tableDiv .el-button-group>.el-button:not(:last-child) {
    margin-right: 10px;
    border-radius:3px !important;
}
.tableDiv .el-button-group>.el-button:last-child {
    border-radius:3px !important;
}
</style>

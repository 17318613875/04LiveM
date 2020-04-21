<!--
 * @Description:
 * @Version: 1.0
 * @Autor: wugeng
 * @Date: 2019-10-25 09:45:58
 * @LastEditors: wugeng
 * @LastEditTime: 2019-10-28 10:06:11
 -->
<template>
  <d2-container class="page">
    <div class="d2-page-cover">
      <div class="d2-page-cover__logo">
        <svg aria-hidden="true" class="logo">
          <use xlink:href="#d2-d2-admin" />
        </svg>
      </div>
      <p class="d2-page-cover__title">{{$appTitle}}</p>
    </div>
  </d2-container>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {}
  },
  created () {

  },
  activated () {

  }
}
</script>

<style lang="scss" scoped>
.page {
  .logo {
    width: 120px;
  }
  .btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: 0px;
    margin-bottom: 20px;
    .btn-group__btn {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
      &.btn-group__btn--link {
        color: $color-primary;
      }
    }
  }
}
.d2-page-cover {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-flow: column nowrap;
  flex-flow: column nowrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.d2-page-cover .d2-page-cover__logo img {
  width: 200px;
}

.d2-page-cover .d2-page-cover__title {
  margin: 0;
  margin-bottom: 20px;
  font-weight: 700;
  color: #303133;
}

.d2-page-cover .d2-page-cover__sub-title {
  margin: 0;
  margin-bottom: 5px;
  color: #606266;
}

.d2-page-cover .d2-page-cover__build-time {
  margin: 0;
  margin-bottom: 10px;
  font-size: 12px;
  color: #c0c4cc;
}
</style>

<template>
  <div class="my-layout-flex">
    <header style="my-layout-header">
      <slot name="header"></slot>
    </header>
    <main class="my-layout-main">
      <div class="my-layout-main_content">
        <slot name="body"></slot>
      </div>
    </main>
    <footer class="my-layout-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "MyLayout"
};
</script>

<style lang="scss">
.my-layout-flex {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  // overflow: hidden;
  .my-layout-header,
  .my-layout-footer {
    flex-shrink: 0;
  }
  .my-layout-main {
    display: -moz-box;
    display: -webkit-box;
    flex: 1;
    flex-grow: 1;
    position: relative;
    overflow: auto;
    .my-layout-main_content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
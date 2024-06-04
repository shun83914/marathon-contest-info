<template>
  <div class="app-container fullscreen-div" style="background-color: skyblue;">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
      <RequestLoading></RequestLoading>
    </div>
  </div>
</template>
<style>
.fullscreen-div {
  position: fixed; /* 或使用absolute，取决于你的具体需求 */
  top: 0;
  left: 0;
  width: 100vw; /* 视口宽度 */
  height: 100vh; /* 视口高度 */
  z-index: -1; /* 根据需要调整，确保div不会遮挡页面上的其他元素 */
  overflow-y: scroll;
}

.fullscreen-div img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保证图片覆盖整个div且不变形 */
}
</style>

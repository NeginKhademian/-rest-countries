<template>
  <div class="skeleton_container">
    <div class="gradient skeleton_container__country" />
  </div>
</template>

<style lang="scss" scoped>
.skeleton_container {
  height: 100vh;
  width: 100%;
  padding: 5px;
  background-color: #f5f5f5;
  margin: 0 auto;
  box-shadow: 0px 1px 32px 4px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  &__country {
    height: 100vh;
    width: 100%;
    margin: auto;
    overflow: hidden;
  }
  .gradient {
    animation-duration: 1.8s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #fafafa;
    background: linear-gradient(
      to right,
      #fafafa 15%,
      #cdcdcd 20%,
      #fafafa 30%,
      #fafafa 15%
    );
    background-size: 1000px 640px;

    position: relative;
  }

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }
}
</style>

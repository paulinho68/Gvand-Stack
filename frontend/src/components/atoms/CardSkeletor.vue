<template>
  <Skeletor size="150" />
  <div class="card-skeletor-content">
    <Skeletor size="14" />
    <Skeletor width="100%" height="14" />
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
/* Static background */
.card-skeletor-content {
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .vue-skeletor {
    border-radius: 0;
  }
  .vue-skeletor:first-child {
    border-bottom-left-radius: 4px;
    margin-right: 4px;
  }
  .vue-skeletor:last-child {
    border-bottom-right-radius: 4px;
  }
}
.vue-skeletor {
  background-color: #ccc;
  border-radius: 4px;
}

/* 
    If you have theme switching in your app for example
    from light to dark, you can target skeletons under 
    some global theme class or attribute e.g. 
  */
[data-theme="dark"] .vue-skeletor {
  background: rgba(226, 206, 206, 0.514);
}

/* 
    Text skeleton
    By default skeletor uses fully rounded style for text
    type skeletons, you can change that as you like
  */
.vue-skeletor--text {
  /* Completely square style skeletons */
}

/* Shimmer */
.vue-skeletor:not(.vue-skeletor--shimmerless):after {
  /* 
      Change the shimmer color, its a simple 90 deg 
      linear horizontal gradient, adjust it however
      you like.
    */
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  );

  /* Change any css keyframes animation property */
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  /* ... */

  /* 
      Or implement your custom shimmer css animation 
      if you want it's pure css no magic happening =)
    */
}

/* Default keyframes used in skeletor */
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>

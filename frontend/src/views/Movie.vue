<template>
  <div>
    <h1>Movie: {{ movieId }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      movieId: this.$route.params.id,
    };
  },
};
</script>

<style lang="scss" scoped></style>

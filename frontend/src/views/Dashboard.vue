<template>
  <div class="header-content">
    <h1>Top picks</h1>
    <p>based on your ratings, MovieLens recommends these movies</p>
  </div>
  <ListMovies :movies="movies" :loading="loading" />
</template>

<script>
import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import { computed, watchEffect } from "vue";
import { ALL_MOVIES } from "../gql/movies.js";
import { apolloClient } from "../plugins/apollo";
import ListMovies from "@/components/molecules/ListMovies.vue";

provideApolloClient(apolloClient);
const { result, loading } = useQuery(
  ALL_MOVIES,
  {},
  {
    variables: {
      options: {
        limit: 10,
        offset: 0,
      },
    },
  }
);
const movies = computed(() => result.value?.movies ?? []);
watchEffect(() => {
  console.log(movies);
});
export default {
  data() {
    return {
      movies,
      loading,
    };
  },
  components: {
    ListMovies,
  },
};
</script>

<style lang="scss" scoped>
.header-content {
  margin: 0 60px;
  color: #fff;
  h1 {
    position: relative;
    font-size: 24px;
    @media (max-width: 400px) {
      font-size: 16px;
    }
  }
  p {
    position: relative;
    font-size: 16px;
    @media (max-width: 400px) {
      font-size: 12px;
    }
  }
}
</style>

<template>
  <div class="container-personalized">
    <Header></Header>
    <div class="header-content">
      <h1>Top picks</h1>
      <p>based on your ratings, MovieLens recommends these movies</p>
    </div>
    <ListMovies :movies="movies" :loading="loading" />
  </div>
  <v-divider color="rgb(255, 255, 255, 0.8)" class="mb-8 mt-4"></v-divider>
  <div class="container-personalized">
    <div class="header-content">
      <h1>Recent Releases</h1>
      <p>movies released that you haven't rated</p>
    </div>
    <ListMovies :movies="recentMoviesReleases" :loading="secondLoading" />
  </div>
</template>

<script>
import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import { computed } from "vue";
import { ALL_MOVIES } from "../gql/movies.js";
import { apolloClient } from "../plugins/apollo";
import Header from "@/components/atoms/Header.vue";
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
const { result: secondResult, loading: secondLoading } = useQuery(
  ALL_MOVIES,
  {},
  {
    variables: {
      options: {
        limit: 50,
        offset: 0,
        sort: [{ released: "DESC" }],
      },
    },
  }
);
const movies = computed(() => result.value?.movies ?? []);
const recentMoviesReleases = computed(
  () =>
    secondResult.value?.movies?.filter(
      (movie) => movie?.released !== null && !!movie?.poster && !!movie?.year
    ) ?? []
);

export default {
  data() {
    return {
      movies,
      loading,
      secondLoading,
      recentMoviesReleases,
    };
  },
  components: {
    ListMovies,
    Header,
  },
};
</script>

<style lang="scss" scoped>
.container-personalized {
  padding: 0 5vw;
}
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

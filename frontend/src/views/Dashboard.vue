<template>
  <div>{{ title }}</div>
  <div v-if="loading">
    <p>loading...</p>
  </div>
  <li v-if="!loading" v-for="movie in movies" :key="movie.title">
    {{ movie.title }}
  </li>
</template>

<script>
import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import { computed } from "vue";
import { ALL_MOVIES } from "../gql/movies";
import { apolloClient } from "../plugins/apollo";

provideApolloClient(apolloClient);

const { result, loading } = useQuery(ALL_MOVIES);
const movies = computed(() => result.value?.movies ?? []);

export default {
  data() {
    return {
      title: "Tela Dashboard",
      movies,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped></style>

<script setup>
import gql from "graphql-tag";
import { useQuery } from '@vue/apollo-composable'
import { watchEffect, computed } from 'vue';

const ALL_MOVIES = gql`
  query{
    movies{
      title
    }
  }
`;

const { result } = useQuery(ALL_MOVIES);

const movies = computed(() => result.value?.movies ?? []);

watchEffect(() => {
  console.log(movies)
})

</script>


<template>
  <div class="apollo">
    <h3>Hello</h3>
    <li v-for="movie in movies" :key="movie.title">
      {{ movie.title }}
    </li>
  </div>
</template>


<template>
  <v-sheet class="mx-auto v-sheet-cards">
    <v-slide-group multiple show-arrows>
      <v-slide-item
        class="v-slide-item-movies"
        v-if="!!loading"
        v-for="n = 0 in 10"
        :key="n"
      >
        <CardSkeletor />
      </v-slide-item>
      <v-slide-item
        class="v-slide-item-movies"
        v-if="!loading"
        v-for="movie in movies"
        :key="movie.movieId"
      >
        <CardMovie
          :title="movie.title"
          :img_url="movie.poster"
          :rating="movie.imdbRating"
          :year="movie.year"
          :runtime="movie.runtime"
        />
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
import CardMovie from "@/components/atoms/CardMovie.vue";
import CardSkeletor from "@/components/atoms/CardSkeletor.vue";

export default {
  props: {
    loading: Boolean,
    movies: [],
  },
  components: {
    CardMovie,
    CardSkeletor,
  },
};
</script>

<style lang="scss" scoped>
li {
  color: #fff;
}
.v-sheet-cards {
  background-color: #0a1014;
  color: #fff !important;
  font-size: 28px !important;
  margin-top: 10px;
}
.v-slide-item-movies {
  margin: 0 10px;
}
</style>

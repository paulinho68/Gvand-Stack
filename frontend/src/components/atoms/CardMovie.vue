<template>
  <div class="card-movie">
    <router-link :to="{ name: 'Movie', params: { id: movieId } }">
      <img :src="img_url" :alt="title" />
    </router-link>
    <div class="card-movie-title">
      <p>{{ title.length > 20 ? `${title.substring(0, 20)}...` : title }}</p>
    </div>
    <div class="card-movie-content">
      <div class="card-movie-classification">
        <p>R</p>
      </div>
      <p>{{ year }}</p>
      <span>|</span>
      <p>{{ runtime }} min</p>
    </div>
    <v-card-actions>
      <span class="grey--text text--lighten-2 text-caption mr-2">
        ({{ current_rating }})
      </span>
      <v-rating
        background-color="white"
        color="#3aabdf"
        hover
        length="5"
        size="5"
        half-increments
        v-model="current_rating"
      ></v-rating>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: "CardMovie",
  props: {
    movieId: String,
    title: String,
    img_url: String,
    rating: Number,
    year: Number,
    runtime: Number,
  },
  data() {
    return {
      current_rating: 0,
    };
  },
  created() {
    this.current_rating = (this.rating / 2).toFixed(1);
  },
};
</script>

<style lang="scss" scoped>
.v-card-actions {
  padding: 0 !important;
  justify-content: space-between;
}
.v-rating {
  margin-top: -20px;
  gap: 5px;
  font-size: 15px;
}
.card-movie {
  padding: 10px 0;
  width: 170px;
  img {
    width: 100%;
    height: 220px;
    margin: 0;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }

  .card-movie-title {
    p {
      margin: 5px 0;
      font-size: 16px;
      font-weight: 700;
      color: #3aabdf;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
  }

  .card-movie-classification {
    display: flex;
    align-items: flex-start;
    text-align: center;
    padding: 2px 5px;

    p {
      color: #fff;
      font-weight: 500;
    }

    width: 18px;
    height: 19px;

    background: #3aabdf;
    border-radius: 4px;
  }
  .card-movie-content {
    font-size: 12px;
    font-weight: 500;
    color: #ffffff;

    span {
      color: rgba(255, 255, 255, 0.2);
    }

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>

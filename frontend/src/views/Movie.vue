<template>
  <div class="container d-block">
    <Header></Header>
    <div class="content">
      <Skeletor
        v-if="!movie"
        size="450"
        style="width: 350px; margin-right: 100px"
      />
      <img
        v-if="movie"
        :src="movie.poster"
        :alt="movie.title"
        class="poster-image"
      />
      <div class="sub-content">
        <Skeletor v-if="!movie" size="50" style="width: 400px" />
        <h1 v-if="movie">Movie: {{ movie.title }} ({{ movie.year }})</h1>
        <Skeletor
          v-if="!movie"
          size="10"
          style="width: 300px; margin-top: 20px"
        />
        <div v-if="movie" class="d-flex">
          <div class="card-movie-classification">
            <p>R</p>
          </div>
          <ul
            class="genres"
            v-if="movie?.genres"
            v-for="genre in movie?.genres"
            :key="genre.name"
          >
            <li>
              {{
                `${genre.name} ${genre !== movie.genres.at(-1) ? " | " : ""}`
              }}
            </li>
          </ul>

          <span class="runtime"><span>•</span>{{ movie.runtime }}min</span>
        </div>
        <Skeletor
          v-if="!movie"
          size="50"
          style="width: 300px; margin-top: 20px"
        />
        <p v-if="movie" class="plot text-justify">
          {{ movie.plot }}
        </p>
        <Skeletor
          v-if="!movie"
          size="150"
          style="width: 100px; margin-top: 50px"
        />
        <div
          class="directors"
          v-if="movie?.directors"
          v-for="director in movie?.directors"
          :key="director.name + Math.random()"
        >
          <a :href="director.url" target="_blank">
            <div class="director">
              <img :src="director.poster" :alt="director.bio" />
              <p>{{ director.name }}</p>
              <p id="director-title">Director</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MOVIE_BY_ID } from "../gql/movies";
import Header from "@/components/atoms/Header.vue";

export default {
  async beforeCreate() {
    const { data } = await this.$apollo.query({
      query: MOVIE_BY_ID,
      variables: {
        movieID: String(this.$route.params.id),
      },
    });
    this.movie = data?.movies[0] || {};
  },
  data() {
    return {
      movieId: this.$route.params.id,
      movie: null,
    };
  },
  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 2vw;

  .content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 50px 10vw;
    width: auto;

    .poster-image {
      height: 450px;
      width: 350px;
      border-radius: 8px;
      margin-right: 100px;
    }

    .sub-content {
      .d-flex {
        margin-top: 10px;
      }
      .genres {
        color: white;
        list-style: none;
        li {
          margin-left: 5px;
        }
      }

      h1,
      p,
      span {
        color: #fff;
      }
      p:nth-child(2) {
        margin-left: 10px;
      }
      .runtime {
        font-weight: 500;
        span {
          margin-left: -20px;
          margin-right: 10px;
        }
        margin-left: 30px;
      }

      .plot {
        font-weight: lighter;
        margin-top: 30px;
        margin-left: -1px;
      }

      .card-movie-classification {
        display: flex;
        align-items: flex-start;
        text-align: center;
        padding: 0px 5px;

        background: #3aabdf;
        border-radius: 4px;
        p {
          color: #fff;
          font-weight: 500;
        }
      }

      .directors {
        margin-top: 50px;
        display: flex;
        & ~ .directors {
          margin-right: 50px;
        }
        .director {
          img {
            width: 100px;
            height: 120px;
            border-radius: 4px;
          }

          p {
            font-size: 18px;
            margin-left: -5px;
            text-decoration: none;
          }
          #director-title {
            font-size: 12px;
          }
        }
      }
    }
  }

  .vue-skeletor {
    border-radius: 8px;
  }
}
</style>

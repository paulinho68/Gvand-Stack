import gql from "graphql-tag";

export const ALL_MOVIES = gql`
  query ($options: MovieOptions) {
  movies (options: $options){
      title
      poster
      imdbRating
      movieId
      year
      runtime
    }
  }
`;
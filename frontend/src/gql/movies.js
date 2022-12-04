import gql from "graphql-tag";

export const ALL_MOVIES = gql`
  query ($options: MovieOptions, $where: MovieWhere) {
    movies(options: $options, where: $where) {
      title
      poster
      imdbRating
      movieId
      year
      runtime
    }
  }
`;

export const MOVIE_BY_ID = gql`
  query ($movieID: String!) {
    movies(where: { movieId: $movieID }) {
      title
      movieId
      year
      url
      plot
      poster
      runtime
      released
      directors {
        name
        bio
        poster
        url
      }
      genres {
        name
      }
    }
  }
`;

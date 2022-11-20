import gql from "graphql-tag";
export const ALL_MOVIES = gql`
  query {
    movies {
      title
    }
  }
`;
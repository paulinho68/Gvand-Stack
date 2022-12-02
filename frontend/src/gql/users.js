import gql from "graphql-tag";

export const USER_BY_NAME = gql`
  query Users($name: String) {
    users(where: { name: $name }) {
      userId
      permisson
      name
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: [UserCreateInput!]!) {
    createUsers(input: $input) {
      users {
        name
        permisson
        userId
      }
    }
  }
`;

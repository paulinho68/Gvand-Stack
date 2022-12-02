import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer, gql } from "apollo-server";
import { driver as _driver, auth } from "neo4j-driver";

const AURA_ENDPOINT = "neo4j+s://1a0a6952.databases.neo4j.io";
const USERNAME = "neo4j";
const PASSWORD = "eBqInJWNU7dZ4TKmIBrc9vVUPpHSfQVFzPu2CJLt9qI";

// Create Neo4j driver instance
const driver = _driver(
  AURA_ENDPOINT,
  auth.basic(USERNAME, PASSWORD)
);

const typeDefs = gql`

    type User {
      name: String
      permisson: String
      userId: Int
    }
      
    interface Person {
      name: String!
      born: Date!
      bornIn: String!
      died: String
      imdbId: Int
      tmdbId: Int
      url: String!
    }

    type Director implements Person{
        name: String!
        bio: String!
        born: Date!
        bornIn: String!
        died: String
        imdbId: Int
        poster: String!
        tmdbId: Int
        url: String!
        movies: [Movie!]! @relationship(type: "DIRECTED", direction: OUT)
    }

    type Actor implements Person{
        name: String!
        bio: String!
        born: Date!
        bornIn: String!
        died: String
        imdbId: Int
        poster: String!
        tmdbId: Int
        url: String!
        movies: [Movie!]! @relationship(type: "ACTED_IN", direction: OUT)
    }

    type Movie {
        movieId: String!
        countries: [String]
        languages: [String]
        imdbId: Int
        imdbRating: Float
        imdbVotes: Int
        plot: String!
        poster: String
        released: DateTime!
        revenue: Int!
        runtime: Int
        title: String!
        tmdbId: Int
        url: String
        year: Int
        genres: [Genre!]! @relationship(type: "IN_GENRE", direction: OUT)
        actors: [Actor!]! @relationship(type: "ACTED_IN", direction: IN)
        directors: [Director!]! @relationship(type: "DIRECTED", direction: IN)
    }

    type Genre {
      name: String!
    }
`;


// Create instance that contains executable GraphQL schema from GraphQL type definitions
const neo4jGraphQL = new Neo4jGraphQL({
  typeDefs,
  driver,
  // resolvers: [UserResolver]
});

// Generate schema
neo4jGraphQL.getSchema().then((schema) => {
  // Create ApolloServer instance to serve GraphQL schema
  const server = new ApolloServer({
    schema,
    context: { driverConfig: { database: "neo4j" } },
  });

  // Start ApolloServer
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
});

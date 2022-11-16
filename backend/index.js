import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer, gql } from "apollo-server";
import { driver as _driver, auth } from "neo4j-driver";

const AURA_ENDPOINT = "neo4j+s://405b7501.databases.neo4j.io";
const USERNAME = "neo4j";
const PASSWORD = "JDG5jaLD84OL9lSu-jsJrIHCI3eDdsY4OlmLAG617Q4";

// Create Neo4j driver instance
const driver = _driver(
  AURA_ENDPOINT,
  auth.basic(USERNAME, PASSWORD)
);

const typeDefs = gql`
    type Movie {
        title: String
        # people: [Person!]! @relationship(type: "ACTED_IN", direction: IN)
        actors: [Actor!]! @relationship(type: "ACTED_IN", direction: IN)
        directors: [Director!]! @relationship(type: "DIRECTED", direction: IN)
    }

    # type Person{
    #   name: String
    #   movies: [Movie!]! @relationship(type: "ACTED_IN", direction: OUT)
    # }

    interface Person {
        name: String
    }

    type Actor implements Person{
        name: String
        movies: [Movie!]! @relationship(type: "ACTED_IN", direction: OUT)
    }

    type Director implements Person{
        name: String
        movies: [Movie!]! @relationship(type: "DIRECTED", direction: OUT)
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

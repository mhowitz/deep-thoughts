

const express = require('express');
//import apollo server: 
const { ApolloServer } = require('apollo-server-express');
//import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  //create a new apollo server and pass in schema data
  const server = new ApolloServer({
    typeDefs, 
    resolvers,
  });
  //start the apollo server
  await server.start();
  //integrate our apollo server with the expresss application as middleware
  server.applyMiddleware({ app });

  //log where you can go to test our gql api
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);

};
//initialize the apollo server
startServer();



app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

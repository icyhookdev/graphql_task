const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const cors = require('cors');
const dotenv = require('dotenv');
const typeDefs = require('./Graphql/typeDefs');
const resolvers = require('./Graphql/resolvers');
const {connection} = require('./DB')
dotenv.config();

const app = express();

app.use(cors());

// body parser middleware
app.use(express.json());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})

connection();

apolloServer.applyMiddleware({app, path: '/graphql'});

const PORT = process.env.PORT || 3000;

app.use('/', (req, res, next) => {
  res.send({message: 'hello'});
})

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`); 
  console.log(`graphql endpoint: ${apolloServer.graphqlPath}`)
})


const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./config.js");
//const gql = require("graphql-tag");
const typeDefs = require("./graphql/type-defs");
const resolvers = require("./graphql/resolvers");
//const Post = require("./models/post");
// const resolvers = {

// };

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});
mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to mongodb");
    return server.listen({ port: 5000 }).then((res) => {
      console.log(`server runing at ${res.url}`);
    });
  }); //.catch(()=>console.log("error occ`ured in connecting"))

// server.listen({port:5000}).then(res=>console.log
//     (`server running at ${res.url}`))

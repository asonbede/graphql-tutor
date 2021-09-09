const postResolvers = require("./post");
const usrsResolvers = require("./users");
const commentsResolvers = require("./comments");

module.exports = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...usrsResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
};

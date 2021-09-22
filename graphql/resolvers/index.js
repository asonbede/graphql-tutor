const postResolvers = require("./post");
const usrsResolvers = require("./users");
const commentsResolvers = require("./comments");
//hhhhh
module.exports = {
  Post:{
    likeCount(parent){
  console.log(parent)
  return parent.likes.length
    },
    commentCount:(parent)=>parent.comments.length
  },
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...usrsResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentsResolvers.Mutation,
  },
};

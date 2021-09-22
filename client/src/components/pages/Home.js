

import {useQuery} from "@apollo/react-hooks"
import gql from "graphql-tag"

import React,{useEffect}  from "react";
import {Grid} from "semantic-ui-react"
import PostCard from "../PostCard"
function Home() {
    
//const{loading,_,data:{getPosts:posts}}  =useQuery(FETCH_POST_QUERY)
const {
    loading,
    data: { getPosts: posts }={}
  } = useQuery(FETCH_POSTS_QUERY);
  
  return  (
        // <h1>hello world </h1>
       <Grid columns={3}>
          <Grid.Row className="page-title">
              <h1>Recent Posts</h1>
          </Grid.Row>
          <Grid.Row>
              {
                loading?(<h1>loading posts...</h1>):
                (posts&&posts.map(post=>(
                    <Grid.Column key={post.id} style={{marginBottom:20}}>
                      <PostCard post={post} />
                   </Grid.Column>      
                )))

              }
          </Grid.Row>

       </Grid>
    )
}

const FETCH_POSTS_QUERY= gql`
{
getPosts{
    id
    body
    createdAt
    username
    likeCount
    likes{
        username
    }
    commentCount
    comments{
        id
        username
        createdAt
        body
    }

}

}
`
export default Home
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import qgl from "graphql-tag";
import { Button, Icon, Label } from "semantic-ui-react";
import MyPopup from "./util/MyPopup";
function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false);
  console.log({ likeCount, id, likes });
  // console.log("post", post);
  useEffect(() => {
    if (
      user &&
      likes &&
      likes.find((like) => like.username === user.username)
    ) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal" onClick={likePost}>
        {" "}
        <Icon name="heart" />{" "}
      </Button>
    ) : (
      <Button color="teal" onClick={likePost}>
        {" "}
        <Icon name="heart" />{" "}
      </Button>
    )
  ) : (
    <Button color="teal" as={Link} to="/login" basic>
      {" "}
      <Icon name="heart" />{" "}
    </Button>
  );

  //   return (
  //     <Button as="div" labelPosition="right" onClick={likePost}>
  //       <Button color="teal" basic>
  //         <Icon name="heart" />
  //         <Label basic color="teal" pointing="left">
  //           {likeCount}
  //         </Label>
  //       </Button>
  //     </Button>
  //   );

  return (
    <Button as="div" labelPosition="right">
      <MyPopup content={liked ? "Unlike" : "Like"}>{likeButton}</MyPopup>
      {/* {likeButton} */}
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

const LIKE_POST_MUTATION = qgl`
    mutation likePost($postId:ID!){
        likePost(postId:$postId){
            id
            likes{
                id
                username
            }
            likeCount
        }
    }
    
    `;
export default LikeButton;

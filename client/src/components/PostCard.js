import React, { useContext, useEffect } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import MyPopup from "./util/MyPopup";
function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);
  console.log("likeCount", likeCount);
  console.log("id", id);
  console.log("likes", likes);
  const likeObj = { id, likeCount, likes };
  // function likePost(params) {
  //   console.log("like post");
  // }

  // function commentOnPost(params) {
  //   console.log("comment on post");
  // }

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          sizes="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username} </Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}{" "}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>

      <Card.Content extra>
        <LikeButton user={user} post={likeObj} />
        <MyPopup content="Comment on post">
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="blue" basic>
              <Icon name="comments" />
              <Label basic color="blue" pointing="left">
                {commentCount}
              </Label>
            </Button>
          </Button>
        </MyPopup>
        {
          user && user.username === username && <DeleteButton postId={id} />
          // <Button
          //   as="div"
          //   color="red"
          //   floated="right"
          //   onClick={() => console.log("delete")}>
          //   <Icon name="trash" style={{ margin: 0 }} />
          // </Button>
        }
      </Card.Content>
    </Card>
  );
}
export default PostCard;

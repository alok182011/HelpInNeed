import React, { useContext, useEffect, useState } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

import { AuthContext } from "../context/auth";

function LikeButton({ post: { id, likes } }) {
  const [liked, setLiked] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
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
      <Button color="pink">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="pink" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    ""
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeButton}
      <Label as="a" basic color="teal" pointing="left">
        {likes.length}
      </Label>
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
        createdAt
      }
    }
  }
`;

export default LikeButton;

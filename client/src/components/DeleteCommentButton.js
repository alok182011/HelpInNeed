import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { Button, Icon, Confirm } from "semantic-ui-react";

function DeleteCommentButton({ postId, commentId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    update() {
      setConfirmOpen(false);
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
        style={{ marginTop: 14 }}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteComment}
      />
    </>
  );
}

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: String!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      body
      username
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

export default DeleteCommentButton;

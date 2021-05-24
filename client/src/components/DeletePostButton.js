import React, { useState } from "react";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { Button, Icon, Confirm } from "semantic-ui-react";

function DeletePostButton({ postId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const history = useHistory();

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);

      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: data.getPosts.filter((p) => p.id !== postId),
        },
      });

      history.push("/");
    },
    variables: {
      postId,
    },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likes {
        username
      }
      comments {
        username
        body
        createdAt
      }
    }
  }
`;

export default withRouter(DeletePostButton);

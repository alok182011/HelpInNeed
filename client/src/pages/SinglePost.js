import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { Grid, Card, Image, Button, Icon } from "semantic-ui-react";
import moment from "moment";

import { AuthContext } from "../context/auth";

import PostCard from "../components/Postcard";
import CommentForm from "../components/CommentForm";
import DeleteCommentButton from "../components/DeleteCommentButton";

import "./SinglePost.css";

function SinglePost(props) {
  const { user } = useContext(AuthContext);
  const postId = props.match.params.postId;

  const {
    loading,
    error,
    data: { getPost: post } = {},
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  return (
    <Grid columns={1}>
      <Grid.Row className="myposts-posts">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          post && (
            <Grid.Column key={post.id}>
              <PostCard post={post} />
            </Grid.Column>
          )
        )}
      </Grid.Row>
      <Grid.Row>
        <CommentForm postId={postId} />
      </Grid.Row>
      <Card fluid className="singlepost-comment-container">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          post.comments &&
          post.comments.map((postComment) => (
            <Card.Content>
              <Image
                floated="right"
                size="mini"
                src="https://image.freepik.com/free-vector/cute-sheltie-dog-cartoon-icon-illustration-animal-icon-concept-isolated-premium-flat-cartoon-style_138676-1564.jpg"
              />
              <Card.Header>
                <h2>{postComment.username}</h2>
              </Card.Header>
              <Card.Meta>
                {moment(postComment.createdAt).fromNow(true)}
              </Card.Meta>
              <Card.Description className="singlepost-comment-body">
                <pre>{postComment.body}</pre>
              </Card.Description>
              {user && user.username === postComment.username && (
                <DeleteCommentButton
                  postId={postId}
                  commentId={postComment.id}
                />
              )}
            </Card.Content>
          ))
        )}
      </Card>
    </Grid>
  );
}

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likes {
        username
      }
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;

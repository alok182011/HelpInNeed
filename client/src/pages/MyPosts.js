import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import Welcome from "../components/Welcome";
import PostForm from "../components/PostForm";
import PostCard from "../components/Postcard";
import { AuthContext } from "../context/auth";

import "./MyPosts.css";

function MyPosts() {
  const { user } = useContext(AuthContext);

  const {
    loading,
    error,
    data: { getPosts: posts } = {},
  } = useQuery(FETCH_POSTS_QUERY);

  return user ? (
    <Grid columns={1}>
      <Grid.Row className="myposts-postform">
        <PostForm />
      </Grid.Row>
      <Grid.Row className="myposts-title">
        <Link style={{ fontSize: 18 }} to="/">
          Recent Posts
        </Link>
        <h1>My Posts</h1>
      </Grid.Row>
      <Grid.Row className="myposts-posts">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          posts &&
          posts.map((post) => {
            if (post.username === user.username) {
              return (
                <Grid.Column key={post.id}>
                  <PostCard post={post} />
                </Grid.Column>
              );
            } else return null;
          })
        )}
      </Grid.Row>
    </Grid>
  ) : (
    <Welcome />
  );
}

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

export default MyPosts;

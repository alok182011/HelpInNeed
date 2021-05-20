import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";

import Welcome from "../components/Welcome";
import PostForm from "../components/PostForm";
import PostCard from "../components/Postcard";
import { AuthContext } from "../context/auth";

import "./Home.css";

function Home() {
  const { user } = useContext(AuthContext);

  const {
    loading,
    error,
    data: { getPosts: posts } = {},
  } = useQuery(FETCH_POSTS_QUERY);

  return user ? (
    <Grid columns={1}>
      <Grid.Row className="home-postform">
        <PostForm />
      </Grid.Row>
      <Grid.Row className="home-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row className="home-posts">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          posts &&
          posts.map((post) => (
            <Grid.Column key={post.id}>
              <PostCard post={post} />
            </Grid.Column>
          ))
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

export default Home;

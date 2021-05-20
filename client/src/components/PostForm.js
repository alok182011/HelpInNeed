import React, { useContext, useState } from "react";
import { Image, Form, TextArea, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import "./PostForm.css";

import { AuthContext } from "../context/auth";

function PostForm(props) {
  const context = useContext(AuthContext);

  console.log();

  const [values, setValues] = useState({
    body: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [createPost, { error }] = useMutation(CREATE_POST, {
    update(_, result) {
      console.log(result);
      values.body = "";
      window.location.reload();
    },
    onError(err) {
      console.log(err);
    },
    variables: values,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
  };

  return (
    <div className="postform-container">
      <div className="postform-infocard">
        <Image
          className="postform-image"
          size="small"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <h2>{context.user.username}</h2>
      </div>
      <div className="postform-postform">
        <h2>Let Us Help You :)</h2>

        <Form onSubmit={handleSubmit} noValidate>
          <TextArea
            type="text"
            label="Body"
            name="body"
            value={values.body}
            onChange={handleChange}
            placeholder="Tell us your problem..."
            error={error ? true : false}
            style={{
              minHeight: 150,
              backgroundColor: "lightblue",
              fontSize: 20,
            }}
          />
          <Button
            disabled={!values.body.trim()}
            type="submit"
            className="postform-button"
          >
            Post
          </Button>
        </Form>
        {error && (
          <div className="ui error message">
            <ul className="list">
              <li>{error.graphQLErrors[0].message}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        username
        id
      }
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

export default PostForm;

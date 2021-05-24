import React, { useContext, useState } from "react";
import { Image, Form, TextArea, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import "./CommentForm.css";

import { AuthContext } from "../context/auth";

function CommentForm({ postId }) {
  const context = useContext(AuthContext);

  const [values, setValues] = useState({
    body: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [createComment, { error }] = useMutation(CREATE_COMMENT, {
    update() {
      values.body = "";
    },
    onError(err) {
      console.log(err);
    },
    variables: {
      body: values.body,
      postId,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment();
  };

  return (
    <div className="commentform-container">
      <div className="commentform-infocard">
        <Image
          className="commentform-image"
          size="small"
          src="https://image.freepik.com/free-vector/cute-sheltie-dog-cartoon-icon-illustration-animal-icon-concept-isolated-premium-flat-cartoon-style_138676-1564.jpg"
        />
        <h2>{context.user.username}</h2>
      </div>
      <div className="commentform-commentform">
        <h2>Let's help :)</h2>

        <Form onSubmit={handleSubmit} noValidate>
          <TextArea
            type="text"
            label="Body"
            name="body"
            value={values.body}
            onChange={handleChange}
            placeholder="Do you know a way to help ???"
            error={error ? 1 : 0}
            style={{
              minHeight: 150,
              backgroundColor: "lightblue",
              fontSize: 20,
            }}
          />
          <Button
            disabled={!values.body.trim()}
            type="submit"
            className="commentform-button"
          >
            Comment
          </Button>
        </Form>
      </div>
    </div>
  );
}

const CREATE_COMMENT = gql`
  mutation createComment($body: String!, $postId: String!) {
    createComment(body: $body, postId: $postId) {
      id
      body
      createdAt
      username
      comments {
        body
        username
        createdAt
        id
      }
    }
  }
`;

export default CommentForm;

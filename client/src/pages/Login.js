import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import "./Register.css";

import { AuthContext } from "../context/auth";

function Login(props) {
  const context = useContext(AuthContext);

  if (context.user) {
    props.history.push("/");
  }

  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      context.login(result.data.login);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className="register-form">
      <Form
        style={{ fontSize: 20 }}
        onSubmit={handleSubmit}
        noValidate
        className={loading ? "loading" : ""}
      >
        <Form.Input
          fluid
          type="text"
          label="Username"
          placeholder="Username"
          name="username"
          value={values.username}
          error={errors.username ? true : false}
          onChange={handleChange}
        />
        <Form.Input
          fluid
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={handleChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;

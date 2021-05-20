import React, { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import "./Register.css";

import { AuthContext } from "../context/auth";

function Register(props) {
  const context = useContext(AuthContext);

  if (context.user) {
    props.history.push("/");
  }

  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.register);
      props.history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
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
          type="email"
          label="Email"
          placeholder="Email"
          name="email"
          value={values.email}
          error={errors.email ? true : false}
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
        <Form.Input
          fluid
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          error={errors.confirmPassword ? true : false}
          onChange={handleChange}
        />
        <Button type="submit" primary>
          Register
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;

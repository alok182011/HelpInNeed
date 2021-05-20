import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./Welcome.css";

function Welcome() {
  return (
    <div>
      <div>
        <lottie-player
          id="anim"
          style={{ marginTop: 50 }}
          src="https://assets1.lottiefiles.com/private_files/lf30_GTmtHy.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
        <h1 className="welcome-title">Helper</h1>
      </div>

      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <lottie-player
              id="anim"
              src="https://assets7.lottiefiles.com/packages/lf20_NjRqYM.json"
              background="transparent"
              speed="1"
              style={{ width: 300, height: 300 }}
              loop
              autoplay
            ></lottie-player>
          </Grid.Column>
          <Grid.Column className="welcome-new-column">
            <h2 style={{ fontFamily: "Itim" }}>
              There are few people who sometimes need help to succeed, a mentor
              to guide.
            </h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid columns={2}>
        <Grid.Row className="welcome-new-row">
          <Grid.Column className="welcome-new-column">
            <h2 style={{ fontFamily: "Itim" }}>
              While there are some who are blessed and capable of helping
              others.
            </h2>
          </Grid.Column>
          <Grid.Column>
            <lottie-player
              id="anim"
              src="https://assets10.lottiefiles.com/private_files/lf30_5u6A5U.json"
              background="transparent"
              speed="1"
              style={{ width: 300, height: 300 }}
              loop
              autoplay
            ></lottie-player>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid columns={1} style={{ textAlign: "center" }}>
        <Grid.Row>
          <Grid.Column>
            <lottie-player
              id="anim"
              src="https://assets5.lottiefiles.com/private_files/lf30_wwq2op12.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            ></lottie-player>
          </Grid.Column>
          <Grid.Column>
            <h2 style={{ fontFamily: "Itim", marginTop: 20 }}>
              So let's help each other out and grow together 🚀
            </h2>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <h1 id="welcome-signin">
        <Link to="/register">
          <h1>Sign Up 🐱‍🏍</h1>
        </Link>
      </h1>
      <br />
      <br />
    </div>
  );
}

export default Welcome;

import React from "react";
import { Card, Image, Button, Icon, Label } from "semantic-ui-react";
import moment from "moment";

import "./PostCard.css";

function PostCard({
  post: { body, createdAt, comments, id, username, likes },
}) {
  return (
    <Card fluid className="postcard-container">
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>
          <h2>{username}</h2>
        </Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description className="postcard-body">
          <pre>{body}</pre>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right">
          <Button color="pink" basic>
            <Icon name="heart" />
          </Button>
          <Label as="a" basic color="teal" pointing="left">
            {likes.length}
          </Label>
        </Button>
        <Button as="div" labelPosition="right">
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label as="a" basic color="blue" pointing="left">
            {comments.length}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;

import React, { useContext } from "react";
import { Card, Image, Button, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

import "./PostCard.css";

import LikeButton from "./LikeButton";
import { AuthContext } from "../context/auth";
import DeletePostButton from "./DeletePostButton";

function PostCard({
  post: { body, createdAt, comments, id, username, likes },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid className="postcard-container">
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image
          floated="right"
          size="mini"
          src="https://image.freepik.com/free-vector/cute-sheltie-dog-cartoon-icon-illustration-animal-icon-concept-isolated-premium-flat-cartoon-style_138676-1564.jpg"
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
        <LikeButton post={{ id, likes }} />

        <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {comments.length}
          </Label>
        </Button>

        {user && user.username === username && <DeletePostButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;

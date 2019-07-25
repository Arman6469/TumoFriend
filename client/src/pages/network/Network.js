import React, { useState,useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Widget, addResponseMessage } from "react-chat-widget";
import ReactQuill from 'react-quill';
import VideoChat from './VideoChat'

import "react-chat-widget/lib/styles.css";

import "./network.css";
import Socket from "../../socket";

/**
 * Main React Component for the networking page (WYSIWIG, Chat, Video, Canvas)
 */
export default function NetworkPage({ user,withUser ,receiver}) {
const [text, setText] = useState('');

const handleChange = event => setText(event.target.value)


  const handleNewUserMessage = newMessage => {
    console.log(`New message incoming! ${newMessage}`);
    Socket.connect(users => {
      users.emit("chat",withUser, newMessage);
    });
  };
  // constructor(props) {

  // TODO: set state and handlers for chat message and WYSIWIG

  const componentDidMount = () => {
    Socket.connect(users => {
      users.on("chat", message => {
        addResponseMessage(message);
      });
    });
  };

  useEffect(() => {
    componentDidMount();

    return() => {
      componentWillUnmount();
    }
   
  }, []);

  const componentWillUnmount = () => {
    Socket.connect(users => {
      users.removeListener('chat')
    })
  }
  // }
  // componentDidMount() {

  // TODO: connect to socket and emit/recieve messages for chat and editor

  // }
  // componentWillUnmount() {

  // TODO: cleanup listeners for chat/editor sockets

  // }

  return (
    <Container fluid={true} className="p-0">
      {
        <Widget
          title="My new awesome title"
          subtitle={`${user.firstName}`}
          handleNewUserMessage={handleNewUserMessage}
        />
      }
      <Row noGutters={true}>
        <Col>
          <span>TODO: add tabs for Canvas and WYSIWIG</span>
          {
            // TODO: add tabs for Canvas and WYSIWIG }
          }
        </Col>
        <Col>
          <div>
            TODO: add VideoChat element
            {
              <VideoChat 
              user = {user}
              caller = {receiver ? withUser : user}
              receiver = {receiver ? user : withUser }
              />
            }
          </div>
        </Col>
      </Row>
    </Container>
  );
}

import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import Socket from '../../socket';
import { Container, Col, ListGroup, Badge, Tab, Button } from 'react-bootstrap';
import './Search.css'





export default function Search({currentUser,startChat,history}) {
  const [query, setQuery] = useState('')
  const [list, setList] = useState([])

  const handleChang = (event) => setQuery(event.target.value)

  const handleSearch = event => {
    event.preventDefault()
    Socket.connect(users => {
      users.emit('search',
        query, (data) => {
          setList(data)
        }
      )
    })
    setQuery('')
  }

  useEffect(() => {
    Socket.connect(users => {
      users.emit('search',
        query, (data) => {
          setList(data)
        }
      )
    }) 
  }, [])

  const onstartChat = (withUser) => {
    startChat(withUser);
    Socket.users.emit('start-chat', withUser, currentUser);
    console.log('start-chat with user', withUser);
    history.push('/network');
  }



  // componentDidMount() {
  //   // TODO: event handlers if user logged in or out, run query
  // }

  // onStudentLoggedIn() {
  //   // TODO: Socket event handler if user logged in - run query
  // }
  // onStudentLoggedOut() {
  //   // TODO: Socket event handler if user logged out - run query
  // }
  // onstartChat(withUser) {
  //   // TODO: event to invoke start-chat action via Socket, redirect to /network page
  // }

  return (

    <Container className="mt-5">
      <nav class="navbar navbar-light bg-light">
        <form class="form-inline" onSubmit={handleSearch}>
          <input value={query} className="w-50 form-control mr-sm-4 " type="search" placeholder="Search" aria-label="Search" onChange={handleChang} />
          <button className="btn btn-outline-success my-2 my-sm-0 " type="submit">Search</button>
        </form>
        <br />
      </nav>
      <Tab.Container id="search-results" defaultActiveKey="#user0">
      <Col>
        <ListGroup>
          {list.map((user, index) => (
            <ListGroup.Item
              eventKey={`#user${index}`}
              as="button"
            >
              <span className='anun'>{user.firstName} {user.lastName}</span>
              {user.loggedIn ? <Badge className="ml-2" variant="success"> </Badge> : null}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col>
              <Tab.Content>
                {list.map((user, index) => (
                  <Tab.Pane eventKey={`#user${index}`}>
                    <div>Name: {user.firstName} {user.lastName}</div>
                    <div>Email: {user.email}</div>
                    <div>Learning Targets: {user.learningTargets.join(', ')}</div>
                    <div>Location: {user.location}</div>
                    <Button className="mt-3" onClick={(e) => { e.preventDefault(); onstartChat(user)}}>Start Chat</Button>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
            </Tab.Container>
    </Container>

  )
}


Search.propTypes = {
  startChat: PropTypes.func,
  currentUser: PropTypes.object,
};

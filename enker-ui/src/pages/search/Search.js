import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Socket from '../../socket';
import { Container } from 'react-bootstrap';
import './Search.css'



export default function Search() {
  const [query,setQuery] = useState('')

  const handleChang = (event) => setQuery(event.target.value)

  const handleSearch = event => {
    event.preventDefault()
    Socket.connect(users =>{
      users.emit('search',
        query, (data) => { console.log(data)}
      )
    })
    setQuery('')
  }


  



  // componentDidMount() {
  //   // TODO: event handlers if user logged in or out, run query
  // }
  // handleSubmit(event) {
  //   // TODO: form submit
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
  // query(textSearch) {
  //   // TODO: emit query via Socket based on text
  // }
  return (
    
       <Container className="mt-5">
        <nav class="navbar navbar-light bg-light">
          <form class="form-inline" onSubmit={handleSearch}>
            <input value={query} className="w-50 form-control mr-sm-4 " type="search" placeholder="Search" aria-label="Search" onChange={handleChang} />
            <button class="btn btn-outline-success my-2 my-sm-0 " type="submit">Search</button>
          </form>

          <div>
            
          </div>
        </nav>
      </Container> 
   
  )
}


Search.propTypes = {
  startChat: PropTypes.func,
  currentUser: PropTypes.object,
};

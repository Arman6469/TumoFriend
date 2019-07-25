import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import './Login.css'


/**
 * Component for Login Page
 */
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.loginUser(this.state);
  }

  handleEmailChange = event => {
    this.setState({ 
      email: event.target.value
    })
  }

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value
    })
  }

  render() {
    // TODO: use to redirect if user not logged in
    if (this.props.user) {
      return (
        <Redirect to={{
          pathname: '/profile',
        }} />
      )
    }

    return (
       <form onSubmit = {this.handleSubmit}>
       <div className="bgc">
         <div className="container logindiv">
           <div>
             <h1 className="logintext">Login</h1>
           </div>
           <div className="form-group">
             <label htmlFor="exampleInputEmail1">Email address</label>
             <input
               type="email"
               className="form-control"
               id="exampleInputEmail1"
               aria-describedby="emailHelp"
               placeholder="Enter email"
               value={this.state.email} onChange={this.handleEmailChange} required
             />
             <small id="emailHelp" className="form-text text-muted entertext">
               We'll never share your email with anyone else.
             </small>
           </div>
           <div className="form-group">
             <label htmlFor="exampleInputPassword1">Password</label>
             <input
               type="password"
               className="form-control"
               id="exampleInputPassword1"
               placeholder="Password"
               value={this.state.password} onChange={this.handlePasswordChange} required
             />
           </div>
           <div className="submit">
             <button type="submit" className="btn btn-primary">
              Log in
             </button>
           </div>
           <hr />
           <div>
             <p className="dont">
               Don't have an account ? <a href="./signup"> Sign up here!</a>{" "}
             </p>
           </div>
         </div>
       </div>
     </form>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func,
  user: PropTypes.object,
  userError: PropTypes.string,
}

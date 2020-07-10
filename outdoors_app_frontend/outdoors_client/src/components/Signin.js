import React, { Component } from 'react';

class Signin extends Component {

        state = {
        users : [],
        formInputs: {
            username: '',
            email: ''
        }
    }
    
    componentDidMount(){
        this.getUsers()
      }
    
      getUsers = () => {
          fetch('http://localhost:3000/users')
          .then(response => response.json())
          .then(json => this.setState({users: json}))
          .catch(error => console.error(error))
      }
      
      handleChange = (event) => {
        const updateInput = Object.assign( this.state.formInputs, { [event.target.id]: event.target.value })
        console.log(updateInput)
        this.setState(updateInput)
      }
    
      handleSubmit = (event) =>{
        event.preventDefault()
        fetch('http://localhost:3000/users', {
          body: JSON.stringify(this.state.formInputs),
          method: 'POST',
       headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
       }
     })
       .then(createdUser => {
         createdUser.json()
       })
    
       .then(jsonedUser => {
         // reset the form
         // add notice to notices
         this.setState({
           formInputs: {
             username: '',
             email: ''
           },
           users: [jsonedUser, ...this.state.users]
         })
       })
    //    .catch(error => console.log(error))
      }

    render () {
      return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username" value={this.state.formInputs.username}
                  onChange={this.handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email" value={this.state.formInputs.email}
                  onChange={this.handleChange}
                />
                <input type="submit" className="submit" />
              </form>
        </div>
      )
    }
  }

export default Signin;
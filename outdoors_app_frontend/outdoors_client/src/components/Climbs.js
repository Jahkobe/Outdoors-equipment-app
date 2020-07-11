import React, { Component } from 'react';
import Sellclimbs from './Sellclimbs.js';
import './Modal.css';


class Showclimbs extends Component{

  state = {
    editing: false,
    deleted: false
  }

  editPost = () => {
    this.setState({
      editPost: true
    })
  }

  deletePost = (event) => {
      event.preventDefault()
      fetch('http://localhost:3000/climbs/' + this.props.props.id, {
        body: JSON.stringify(this.state.formInputs),
        method: 'DELETE',
     headers: {
       'Accept': 'application/json, text/plain, */*',
       'Content-Type': 'application/json'
     }
   })
  }

  render(){
    return(
      <div>
          <div id="modal">
            {this.props.props.item}<br></br>
            <img src={this.props.props.picture}></img><br></br>
            {this.props.props.description}<br></br>
            {this.props.props.price}<br></br>
            <a onClick={this.props.stopShow} id="close" href="#">Close</a><br></br>
            <button onClick={this.editPost}>Edit</button>
            <button onClick={this.deletePost}>Delete</button>
            {this.state.editPost &&
              <Editclimbs props={this.props.props} editPost={this.editPost}/>
            }
            </div>
      </div>
    );
  }
}

class Editclimbs extends Component{
  state = {
    climbs : [],
    formInputs: {
      item: '',
      description: '',
      price: ''
    }
  }

  componentDidMount(){
    this.getClimbs()
  }

  getClimbs = () => {
      fetch('http://localhost:3000/climbs')
      .then(response => response.json())
      .then(json => this.setState({climbs: json}))
      .catch(error => console.error(error))
  }
  
  handleChange = (event) => {
    const updateInput = Object.assign( this.state.formInputs, { [event.target.id]: event.target.value })
    this.setState(updateInput)
  }

  handleSubmit = (event) =>{
    event.preventDefault()
    fetch('http://localhost:3000/climbs', {
      body: JSON.stringify(this.state.formInputs),
      method: 'POST',
   headers: {
     'Accept': 'application/json, text/plain, */*',
     'Content-Type': 'application/json'
   }
 })
   .then(createdClimb => {
     return createdClimb.json()
   })

   .then(jsonedClimb => {
     // reset the form
     // add notice to notices
     this.setState({
       formInputs: {
         item: '',
         description: '',
         price: ''
       },
       climbs: [jsonedClimb, ...this.state.climbs]
     })
   })
   .catch(error => console.log(error))
  }

render () {
  return (
    <div>
        <h4>Edit </h4>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="item">Item</label>
            <input
              type="text"
              id="item" value={this.state.formInputs.item}
              onChange={this.handleChange} placeholder={this.props.props.item}
            />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description" value={this.state.formInputs.description}
              onChange={this.handleChange} placeholder={this.props.props.description}
            />
            <label htmlFor="price">Price</label>
            <input
              type="integer"
              id="price" value={this.state.formInputs.price}
              onChange={this.handleChange} placeholder={this.props.props.price}
            />
            <input type="submit" className="submit" />
          </form>
    </div>
  )
}
}



class Climbs extends Component {

  state = {
    path: 'http://localhost:3000/climbs/',
    climbid: '',
    climbs : [],
    showing: false,
    formInputs: {
      item: '',
      description: '',
      price: ''
    }
  }

  componentDidMount(){
    this.getClimbs()
  }

  getClimbs = () => {
      fetch('http://localhost:3000/climbs')
      .then(response => response.json())
      .then(json => this.setState({climbs: json}))
      .catch(error => console.error(error))
  }

        handleSubmit = (event) =>{
        event.preventDefault()
        fetch('http://localhost:3000/climbs', {
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
             email: '',
             password_digest: ''
           },
           users: [jsonedUser, ...this.state.users]
         })
       })
    //    .catch(error => console.log(error))
      }

      onClick = (id) => (event) => {
        fetch(this.state.path + id)
      .then(response => response.json())
      .then(json => this.setState({
        climbid: json,
        showing: true   }))
      .catch(error => console.error(error))
      }

      stopShow = () => {
        this.setState({
          showing: false
        })
      }

    render () {
      return (
        <div>
          <Sellclimbs />
          {this.state.showing &&
          <div>
          <Showclimbs  props={this.state.climbid} stopShow={this.stopShow}/>
          </div>
          }
        {this.state.climbs.map( climb => {
            return  (
                <div key={climb.id} className="climb">
                    <a onClick={this.onClick(climb.id)}>
                    {/* <div>seller: {snow.user.username}</div> */}
                    <h3>{ climb.item }</h3>
                    <img src={climb.picture}></img>
                    <p>{ climb.description }</p>
                    <small>${climb.price }</small><br></br></a>
                </div>
            )
        })}
    </div>
      )
    }
  }

export default Climbs;
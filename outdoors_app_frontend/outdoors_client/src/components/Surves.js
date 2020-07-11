import React, { Component } from 'react';
import Sellsurves from './Sellsurves.js';
import './Modal.css';


class Showsurves extends Component{

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
      fetch('http://localhost:3000/surves/' + this.props.props.id, {
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
            <div className="shows">
            <a onClick={this.props.stopShow} id="close" href="#">Close</a><br></br>
            <h1 className="showstitle">{this.props.props.item}</h1><br></br>
            <img src={this.props.props.picture}></img><br></br>
            <p className="showsdescription">{this.props.props.description}</p><br></br>
            <h3 className="showsprice">${this.props.props.price}</h3><br></br>
            <button className="showsbutton" onClick={this.editPost}>Edit</button><br></br>
            <button className="showsbutton" onClick={this.deletePost}>Delete</button>
            </div>
            {this.state.editPost &&
              <Editsurves props={this.props.props} editPost={this.editPost}/>
            }
            </div>
      </div>
    );
  }
}

class Editsurves extends Component{
  state = {
    surves : [],
    formInputs: {
      item: '',
      description: '',
      price: ''
    }
  }

  componentDidMount(){
    this.getSurves()
  }

  getSurves = () => {
      fetch('http://localhost:3000/surves')
      .then(response => response.json())
      .then(json => this.setState({surves: json}))
      .catch(error => console.error(error))
  }
  
  handleChange = (event) => {
    const updateInput = Object.assign( this.state.formInputs, { [event.target.id]: event.target.value })
    this.setState(updateInput)
  }

  handleSubmit = (event) =>{
    event.preventDefault()
    fetch('http://localhost:3000/surves', {
      body: JSON.stringify(this.state.formInputs),
      method: 'POST',
   headers: {
     'Accept': 'application/json, text/plain, */*',
     'Content-Type': 'application/json'
   }
 })
   .then(createdSurf => {
     return createdSurf.json()
   })

   .then(jsonedSurf => {
     // reset the form
     // add notice to notices
     this.setState({
       formInputs: {
         item: '',
         description: '',
         price: ''
       },
       surves: [jsonedSurf, ...this.state.surves]
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



class Surves extends Component {

  state = {
    path: 'http://localhost:3000/surves/',
    surfid: '',
    surves : [],
    showing: false,
    formInputs: {
      item: '',
      description: '',
      price: ''
    }
  }

  componentDidMount(){
    this.getSurves()
  }

  getSurves = () => {
      fetch('http://localhost:3000/surves')
      .then(response => response.json())
      .then(json => this.setState({surves: json}))
      .catch(error => console.error(error))
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
        surfid: json,
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
          <Sellsurves />
          {this.state.showing &&
          <div>
          <Showsurves  props={this.state.surfid} stopShow={this.stopShow}/>
          </div>
          }
        <div className="surfflex">
        {this.state.surves.map( surf => {
            return  (
                <div key={surf.id} className="surf">
                    <a onClick={this.onClick(surf.id)}>
                    {/* <div>seller: {surf.user.username}</div> */}
                    <h3>{ surf.item }</h3>
                    <img src={surf.picture}></img>
                    <p>{ surf.description }</p>
                    <small>${surf.price }</small><br></br></a>
                </div>
            )
        })}
        </div>
    </div>
      )
    }
  }

export default Surves;
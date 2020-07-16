import React, { Component } from 'react';
import './Modal.css';


class Showsnows extends Component{

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
      fetch('http://localhost:3000/snows/' + this.props.props.id, {
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
            <a className="showsclose" onClick={this.props.stopShow} id="close" href="#">Close</a><br></br>
            <h1 className="showstitle">{this.props.props.item}</h1><br></br>
            <img src={this.props.props.picture}></img><br></br>
            <p className="showsdescription">{this.props.props.description}</p><br></br>
            <h3 className="showsprice">${this.props.props.price}</h3><br></br>
           
            <button className="showsbutton" onClick={this.editPost}>Edit</button><br></br>
            <button className="showsbutton" onClick={this.deletePost}>Delete</button>
            {this.state.editPost &&
              <Editsnows props={this.props.props} editPost={this.editPost}/>
            }
            </div>
            </div>
      </div>
    );
  }
}

class Editsnows extends Component{
  state = {
    snows : [],
    formInputs: {
      item: '',
      description: '',
      price: ''
    }
  }

  componentDidMount(){
    this.getSnows()
  }

  getSnows = () => {
      fetch('http://localhost:3000/snows')
      .then(response => response.json())
      .then(json => this.setState({snows: json}))
      .catch(error => console.error(error))
  }
  
  handleChange = (event) => {
    const updateInput = Object.assign( this.state.formInputs, { [event.target.id]: event.target.value })
    this.setState(updateInput)
  }

  handleSubmit = (event) =>{
    event.preventDefault()
    fetch('http://localhost:3000/snows', {
      body: JSON.stringify(this.state.formInputs),
      method: 'POST',
   headers: {
     'Accept': 'application/json, text/plain, */*',
     'Content-Type': 'application/json'
   }
 })
   .then(createdSnow => {
     return createdSnow.json()
   })

   .then(jsonedSnow => {
     // reset the form
     // add notice to notices
     this.setState({
       formInputs: {
         item: '',
         description: '',
         price: ''
       },
       snows: [jsonedSnow, ...this.state.snows]
     })
   })
   .catch(error => console.log(error))
   this.deletePost()
  }

  deletePost = (event) => {
    console.log(this.props.id)
    event.preventDefault()
    fetch('http://localhost:3000/snows/' + this.props.id, {
      body: JSON.stringify(this.state.formInputs),
      method: 'DELETE',
   headers: {
     'Accept': 'application/json, text/plain, */*',
     'Content-Type': 'application/json'
   }
 })
}

render () {
  return (
    <div>
        <h4>Edit </h4>
          <form onSubmit={this.deletePost} onSubmit={this.handleSubmit}>
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



class Snows extends Component {

  state = {
    path: 'http://localhost:3000/snows/',
    snowid: '',
    snows : [],
    showing: false,
    formInputs: {
      item: '',
      description: '',
      price: ''
    }
  }

  componentDidMount(){
    this.getSnows()
  }

  getSnows = () => {
      fetch('http://localhost:3000/snows')
      .then(response => response.json())
      .then(json => this.setState({snows: json}))
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
        snowid: json,
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
          {this.state.showing &&
          <div>
          <Showsnows  props={this.state.snowid} stopShow={this.stopShow}/>
          </div>
          }
          <div className="snowflex">
        {this.state.snows.map( snow => {
            return  (
                <div key={snow.id} className="snow">
                    <a onClick={this.onClick(snow.id)}>
                    {/* <div>seller: {snow.user.username}</div> */}
                    <h3>{ snow.item }</h3>
                    <img src={snow.picture}></img>
                    <p>{ snow.description }</p>
                    <small>${snow.price }</small><br></br></a>
                </div>
            )
        })}
        </div>
    </div>
      )
    }
  }

export default Snows;
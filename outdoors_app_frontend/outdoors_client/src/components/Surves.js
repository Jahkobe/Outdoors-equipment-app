import React, { Component } from 'react';
import './Modal.css';


class Show extends Component{

  render(){
    return(
      <div>
          <div id="modal">
            {this.props.props.item}<br></br>
            <img src={this.props.props.picture}></img><br></br>
            {this.props.props.description}<br></br>
            {this.props.props.price}<br></br>
            <a onClick={this.props.stopShow} id="close" href="#">Close</a>
            </div>
      </div>
    );
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
          {this.state.showing &&
          <div>
          <Show props={this.state.surfid} stopShow={this.stopShow}/>
          </div>
          }
        {this.state.surves.map( surf => {
            return  (
                <div key={surf.id} className="surf">
                    <div>{surf.user.username}</div>
                    <h3>{ surf.item }</h3>
                    <a onClick={this.onClick(surf.id)}><img src={surf.picture}></img></a>
                    <p>{ surf.description }</p>
                    <small>${surf.price }</small><br></br>
                </div>
            )
        })}
    </div>
      )
    }
  }

export default Surves;
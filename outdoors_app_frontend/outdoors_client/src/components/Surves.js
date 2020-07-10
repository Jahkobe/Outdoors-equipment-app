import React, { Component } from 'react';

class Surves extends Component {

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

    render () {
      return (
        <div>
        {this.state.surves.map( surf => {
            return  (
                <div key={surf.id} className="surf">
                    {/* <div>{surf.user.username}</div> */}
                    <h3>{ surf.item }</h3>
                    <img src={surf.picture}></img>
                    <p>{ surf.description }</p>
                    <small>${surf.price }</small>
                </div>
            )
        })}
    </div>
      )
    }
  }

export default Surves;
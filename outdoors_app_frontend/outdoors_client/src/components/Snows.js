import React, { Component } from 'react';

class Snows extends Component {

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

    render () {
      return (
        <div>
        {this.state.snows.map( snow => {
            return  (
                <div key={snow.id} className="snow">
                    {/* <div>{surf.user.username}</div> */}
                    <h3>{ snow.item }</h3>
                    <img src={snow.picture}></img>
                    <p>{ snow.description }</p>
                    <small>${snow.price}</small>
                </div>
            )
        })}
    </div>
      )
    }
  }

export default Snows;
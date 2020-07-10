import React, { Component } from 'react';

class Climbs extends Component {

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

    render () {
      return (
        <div>
        {this.state.climbs.map( climb => {
            return  (
                <div key={climb.id} className="climb">
                    {/* <div>{surf.user.username}</div> */}
                    <h3>{ climb.item }</h3>
                    <img src={climb.picture}></img>
                    <p>{ climb.description }</p>
                    <small>${climb.price}</small>
                </div>
            )
        })}
    </div>
      )
    }
  }

export default Climbs;
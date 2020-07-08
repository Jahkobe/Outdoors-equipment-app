import React, { Component } from 'react';

class Outdoors extends Component {

    render () {
      return (
        <div>
        {this.props.surves.map( surf => {
            return  (
                <div key={surf.id} className="surf">
                    <h3>{ surf.item }</h3>
                    <p>{ surf.description }</p>
                    <small>{surf.price }</small>
                </div>
            )
        })}
    </div>
      )
    }
  }

export default Outdoors;
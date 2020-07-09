import React, { Component } from 'react';

class Surves extends Component {

    render () {
      return (
        <div>
        {this.props.surves.map( surf => {
            return  (
                <div key={surf.id} className="surf">
                    {/* <div>{surf.user.username}</div> */}
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

export default Surves;
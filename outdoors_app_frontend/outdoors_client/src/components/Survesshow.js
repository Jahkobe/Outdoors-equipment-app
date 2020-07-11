import React, { Component } from 'react';

class Survesshow extends Component{

state = {
    path: 'http://localhost:3000/surves/',
    surfid: '',
    }
}

onClick = (id) => (event) => {
    console.log(this.state.path + id);
    fetch(this.state.path + id)
    .then(response => response.json())
    .then(json => console.log(json)/*this.setState({surfid: json})*/)
    .catch(error => console.error(error))
    }

render () {
    return (
        <div>
            
        </div>
    )
}

}

export default Survesshow;
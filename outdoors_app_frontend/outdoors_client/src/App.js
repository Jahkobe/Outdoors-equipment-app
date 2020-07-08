import React, { Component } from 'react';
import Outdoors from './components/Outdoors.js'
import './App.css';

class App extends Component{

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
   .then(createdNotice => {
     return createdNotice.json()
   })

   .then(jsonedNotice => {
     // reset the form
     // add notice to notices
     this.setState({
       formInputs: {
         item: '',
         description: '',
         price: ''
       },
       surves: [jsonedNotice, ...this.state.surves]
     })
   })
   .catch(error => console.log(error))
  }

  render(){
  return (
          <div className="App">
          <div className="container">
            <main>
              <h1>Outdoors Equipment App</h1>
            </main>
              <h4>Sell something </h4>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="item">Item</label>
                <input
                  type="text"
                  id="item" value={this.state.formInputs.item}
                  onChange={this.handleChange}
                />
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description" value={this.state.formInputs.description}
                  onChange={this.handleChange}
                />
                <label htmlFor="price">Price</label>
                <input
                  type="integer"
                  id="price" value={this.state.formInputs.price}
                  onChange={this.handleChange}
                />
                <input type="submit" className="submit" />
              </form>
              <Outdoors surves={this.state.surves}/>
          </div>
        </div>
      );
    }
}

export default App;

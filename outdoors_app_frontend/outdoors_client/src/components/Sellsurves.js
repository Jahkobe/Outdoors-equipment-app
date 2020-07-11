import React, { Component } from 'react';

class Sellsurves extends Component {

    state = {
        surves : [],
        formInputs: {
          item: '',
          picture: '',
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
             picture: '',
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
            <h4>Sell something </h4>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="item">Item</label>
                <input
                  type="text"
                  id="item" value={this.state.formInputs.item}
                  onChange={this.handleChange}
                />
                <label htmlFor="picture">Picture url</label>
                <input
                  type="text"
                  id="picture" value={this.state.formInputs.picture}
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
        </div>
      )
    }
  }

export default Sellsurves;
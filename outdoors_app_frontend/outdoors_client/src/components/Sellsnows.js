import React, { Component } from 'react';

class Sellsnows extends Component {

    state = {
        snows : [],
        formInputs: {
          item: '',
          picture: '',
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
             picture: '',
             description: '',
             price: ''
           },
           snows: [jsonedSnow, ...this.state.snows]
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

export default Sellsnows;
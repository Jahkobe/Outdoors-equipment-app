import React, { Component } from 'react';

class Sellclimbs extends Component {

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
        this.getClimbs()
      }
    
      getClimbs = () => {
          fetch('http://localhost:3000/climbs')
          .then(response => response.json())
          .then(json => this.setState({climbs: json}))
          .catch(error => console.error(error))
      }
      
      handleChange = (event) => {
        const updateInput = Object.assign( this.state.formInputs, { [event.target.id]: event.target.value })
        this.setState(updateInput)
      }
    
      handleSubmit = (event) =>{
        event.preventDefault()
        fetch('http://localhost:3000/climbs', {
          body: JSON.stringify(this.state.formInputs),
          method: 'POST',
       headers: {
         'Accept': 'application/json, text/plain, */*',
         'Content-Type': 'application/json'
       }
     })
       .then(createdClimb => {
         return createdClimb.json()
       })
    
       .then(jsonedClimb => {
         // reset the form
         // add notice to notices
         this.setState({
           formInputs: {
             item: '',
             picture: '',
             description: '',
             price: ''
           },
           climbs: [jsonedClimb, ...this.state.climbs]
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

export default Sellclimbs;
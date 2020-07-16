import React, { Component } from 'react';

class Sellsnows extends Component {

    state = {
        climbs: [],
        surves: [],
        snows : [],
        formInputs: {
          category: '',
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
        if(this.state.category === "Snow"){
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
             category: '',
             item: '',
             picture: '',
             description: '',
             price: ''
           },
           snows: [jsonedSnow, ...this.state.snows]
         })
       })
       .catch(error => console.log(error))
        }else if(this.state.category === "Climb"){
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
                 category: '',
                 item: '',
                 picture: '',
                 description: '',
                 price: ''
               },
               climbs: [jsonedClimb, ...this.state.climbs]
             })
           })
           .catch(error => console.log(error))

        }else if(this.state.category === "Surf"){
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
             category: '',
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
      }

    render () {
      return (
        <div>
            <h4>Sell something </h4>
              <form onSubmit={this.handleSubmit}>
                <label htmlFor="category">Category</label>
                <input 
                  className="inputs"
                  list="category-list"
                  autoComplete="off"
                  type="text"
                  id="category" value={this.state.formInputs.category}
                  onChange={this.handleChange}
                /><br></br>
                <datalist id="category-list" size="3">
                    <option value="Snow">Snow</option>
                    <option value="Climb">Climb</option>
                    <option value="Surf">Surf</option>
                </datalist>
                <label htmlFor="item">Item</label>
                <input
                  className="inputs"
                  type="text"
                  id="item" value={this.state.formInputs.item}
                  onChange={this.handleChange}
                /><br></br>
                <label htmlFor="picture">Picture url</label>
                <input
                  className="inputs"
                  type="text"
                  id="picture" value={this.state.formInputs.picture}
                  onChange={this.handleChange}
                /><br></br>
                <label htmlFor="description">Description</label>
                <input
                  className="inputs"
                  type="text"
                  id="description" value={this.state.formInputs.description}
                  onChange={this.handleChange}
                /><br></br>
                <label htmlFor="price">Price</label>
                <input
                  className="inputs"
                  type="integer"
                  id="price" value={this.state.formInputs.price}
                  onChange={this.handleChange}
                /><br></br>
                <input type="submit" className="submit" />
              </form>
        </div>
      )
    }
  }

export default Sellsnows;
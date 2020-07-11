import React, { Component } from 'react';
import Surves from './components/Surves.js';
import Signin from './components/Signin.js';
import Snows from './components/Snows.js';
import Climbs from './components/Climbs.js';
import Home from './components/Home.js';
import {BrowserRouter} from 'react-router-dom';
import {Route, Link} from 'react-router-dom';
import './App.css';

class App extends Component{

  state = {
    formInputs: {
      item: '',
      description: '',
      price: ''
    }
  }

  render(){
  return (
    <BrowserRouter>
        <div className="App">
          <div className="container">
            <header>
              <nav>
                <ul className="topNav">
                  <div className="homeLink">
                    <li><a href="/">Home</a></li>
                  </div>
                  <li><a href="/users">Login</a></li>
                </ul>
              </nav>
              <nav>
                <ul className="bottomNav">
                  <li><Link to="/surves">Surf</Link></li>
                  <li><Link to="/snows">Snow</Link></li>
                  <li><Link to="/climbs">Climb</Link></li>
                </ul>
              </nav>
            </header>
            <main>
              <h1>Outdoors Equipment App</h1>
            </main>
              <Route path="/" exact component={Home}/>
              <Route path="/climbs" exact component={Climbs}/>
              <Route path="/snows" exact component={Snows}/>
              <Route path="/surves" exact component={Surves}/>
              <Route path="/users" exact component={Signin}/>
          </div>
        </div>
        </BrowserRouter>
      );
    }
}

export default App;

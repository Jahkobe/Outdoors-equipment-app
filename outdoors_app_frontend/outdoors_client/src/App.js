import React, { Component } from 'react';
import Surves from './components/Surves.js';
import Signin from './components/Signin.js';
import Snows from './components/Snows.js';
import Climbs from './components/Climbs.js';
import Home from './components/Home.js';
import {BrowserRouter} from 'react-router-dom';
import {Route, Link} from 'react-router-dom';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import './App.css';

const photos = [
  {
    name: 'Photo 1',
    url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/tilt-image-of-man-snowboarding-against-clear-sky-royalty-free-image-1574869334.jpg?crop=1.00xw:0.873xh;0,0.0533xh&resize=768:*"
  },
  {
    name: 'Photo 2',
    url: 'https://i1.wp.com/www.surfer.com/wp-content/uploads/2019/12/laura.jpg?resize=1920%2C1080&ssl=1'
  },
  {
    name: 'Photo 3',
    url: 'https://www.lifesavvy.com/thumbcache/0/0/b30dc15098e2b7e0875c96dfd26029cf/p/uploads/2019/03/1789a25a.png'  
  },
]

class App extends Component{

  state = {
    formInputs: {
      item: '',
      description: '',
      price: ''
    }
  }

  render(){

    const settings = {
      dots: true,
      fade: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      arrows: true,
      slidesToScroll: 1,
      className: 'slides'
    }

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
              <Slider {...settings}>
                {photos.map((photo) => {
                  return(
                  <div className="imgdiv" >
                    <img className="img" width="70%" src={photo.url}></img>
                  </div>
                  )
                })}
              </Slider>
              <nav>
                <ul className="bottomNav">
                  <li><Link to="/surves">Surf</Link></li>
                  <li><Link to="/snows">Snow</Link></li>
                  <li><Link to="/climbs">Climb</Link></li>
                </ul>
              </nav>
            </header>
            <main>
              <h1 className="sitetitle" >Outdoor Equipment Gear (OEG)</h1>
            </main>
              <Route path="/" exact component={Home}/>
              <Route path="/climbs" exact component={Climbs}/>
              <Route path="/snows" exact component={Snows}/>
              <Route path="/surves" exact component={Surves}/>
              <Route path="/users" exact component={Signin}/>
              <footer className="footer">

              </footer>
          </div>
        </div>
        </BrowserRouter>
      );
    }
}

export default App;

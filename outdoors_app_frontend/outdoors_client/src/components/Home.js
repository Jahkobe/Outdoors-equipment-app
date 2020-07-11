import React, { Component } from 'react';
import './Home.css';


class Home extends Component{
    render(){
        return(
            <div className="imgflex">
                <div className="homeimgdivs" >
                    <a href="/snows">
                        <h2>Ski/Snowboard Gear</h2>
                        <img className="homeimages" src="https://theknow.denverpost.com/wp-content/uploads/2020/02/2-7-20-01-Powder-Day_Curtis-DeVore.jpg"></img>
                    </a>
                </div>
                <div className="homeimgdivs">
                    <a href="/climbs">
                        <h2>Climbing/Camping Gear</h2>
                        <img className="homeimages" src="https://www.outsideonline.com/sites/default/files/styles/img_1400x800/public/2019/11/22/rock-climbing-palestine-main_h.jpg?itok=NzvGlvoX"></img>
                    </a>
                </div>
                <div className="homeimgdivs">
                    <a href="/surves">
                        <h2>Surf/Water Gear</h2>
                        <img className="homeimages" src="https://miro.medium.com/max/700/1*dZumGhyztRrbtwkijpmVaQ.jpeg"></img>
                    </a>
                </div>
            </div>
        )
    }
}

export default Home;
import React from 'react';
import './Home.css'
import {Link} from 'react-router-dom';
import Background1 from '../assets/images/car.jpg';
import Background0 from '../assets/images/suspension.jpg';
import Background from '../assets/images/wheel.jpg';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    handlePhoto = (event) => {
        this.props.history.push("/photographers");
    }



    render() {
      const backStyle = {
        backgroundImage: "url(" + Background + ")",
      }

      const backStyle0 = {
        backgroundImage: 'url(' + Background0 + ')',
      }

      const backStyle1 = {
        backgroundImage: 'url(' + Background1 + ')',
      }
      
      return (
        <React.Fragment>
        <h1 class="mainTitle">Línea de Ventas</h1>
        <section class="categories">
          <div className="category-item" style={ backStyle }>
            <div class="category-item-inner">
              <div><Link to="/category/Freno" className="text-link" >Frenos</Link></div>
            </div>
          </div>
          <div className="category-item" style={backStyle0}>
            <div class="category-item-inner">
              <div><Link to="/category/Suspension" className="text-link" >Suspensión</Link></div>
            </div>
          </div>
          <div className="category-item" style={backStyle1}>
            <div class="category-item-inner">
              <div><Link to="/category/Accesorio" className="text-link" >Accesorios</Link></div>
            </div>
          </div>
        </section>
        </React.Fragment>
      )
  }
}

export default Home;
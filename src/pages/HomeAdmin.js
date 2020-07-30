import React from 'react';
import './HomeAdmin.css'
import {Link} from 'react-router-dom';
import Background1 from '../assets/images/category.jpg';
import Background0 from '../assets/images/list.jpg';
import Background from '../assets/images/create.jpg';

class HomeAdmin extends React.Component {
    constructor() {
        super();
        this.state = {

        }
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
        <h1 class="AdminmainTitle">Qué quieres hacer hoy?</h1>
        <section class="Admincategories">
          <div className="category-item" style={ backStyle }>
            <div class="Admincategory-item-inner">
              <div><Link to="/products/create" className="text-link" >Ingresar Producto</Link></div>
            </div>
          </div>
          <div className="category-item" style={backStyle0}>
            <div class="Admincategory-item-inner">
              <div><Link to="/Home" className="text-link" >Listar Productos</Link></div>
            </div>
          </div>
          <div className="category-item" style={backStyle1}>
            <div class="Admincategory-item-inner">
              <div><Link to="/catecory/create" className="text-link" >Crear Categoría</Link></div>
            </div>
          </div>
        </section>
        </React.Fragment>
      )
  }
}

export default HomeAdmin;
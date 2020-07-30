import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../assets/images/kadimal.png';
import { NavBar } from './NavBar.css';

const navBar = (props) => { 

  const token = props.token;
  const type = props.typeOfUser;

  return (
    <div className="headerNavBar">
      <a href={localStorage.getItem("typeOfUser")==="provider" ? "/homeProvider" :"/home"}><img src={logo} className="logo" alt="Kadimal" /></a>
      {/* <input className="menuButton" type="checkbox" id="menuButton" /> */}
      {/* <label className="menuIcon" htmlFor="menuButton"><span className="navIcon"></span></label> */}
        <nav>
          <ul className="nav_links">
            <li><a href="/home">Línea de Ventas</a></li>
            <li><a href="/services">Servicios</a></li>
            <li><a href="/about">Acerca de Nosotros</a></li>
            <li><a href="/contact">Contacto</a></li>
          </ul>
        </nav>
        
        { !token && !type ?  (
          <React.Fragment>    
          <button className="headerNavBarbutton"><Link to='/signin'><li className="option">Ingresar</li></Link></button>
          <button className="headerNavBarbutton"><Link to='/signup'><li className="option">Crear Cuenta</li></Link></button>
        </React.Fragment> 
          ) : (
            <React.Fragment>
             <button className="headerNavBarbutton"><Link to='/signout'> <li className="option">Salir</li></Link></button>
            </React.Fragment> 
          ) 
        }
    </div>
  )
}

export default navBar;
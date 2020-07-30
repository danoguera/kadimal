import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PayAnswer.css';

function queryString(query){
  const res = {};
  query.replace(/\?/, '').split("&").forEach(q => {
      const [key, value] = q.split("=");
      res[key] = value;
  });
  return res;
}

class PayAnswer extends React.Component{
  constructor(){
    super();
    this.state = {
      loading: true,
      error: false
  } 
} 


  componentDidMount(){
    const {ref_payco } = queryString(this.props.location.search);
    axios({
      method: "GET",
      url: process.env.REACT_APP_EPAYCO_CHECK_URL + ref_payco
    }).then(async(response) => {
      if (response.data.data.x_response==="Aceptada"){
        this.setState({message:"Tu Pago ha sido exitoso!"});
    }else if (response.data.data.x_response==="Pendiente"){
      this.setState({message:"Tu pago está pendiente."});
    }else if (response.data.data.x_response==="Rechazada"){
      this.setState({message:"Tu pago ha sido rechazado."});
    }
    })
    }

    render(){
      return (
        <div className="payConfirmContainer">
          <h1 class="title">{this.state.message}</h1>
          <Link to='/home'> <div className="btnCart btnCart-primary btnCart-purchase">Continuar</div></Link>
        </div>
      )
    }
} 

export default PayAnswer;
import React from 'react';
import axios from 'axios';
import './SignIn.css'; 

class SignIn extends React.Component{
  constructor(){
    super();
    this.state = {
      email: "",
      password: ""
    }
  }

  componentDidMount(){
    localStorage.removeItem("token");
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const url = process.env.REACT_APP_SERVER_URL+"/login";

    axios({
      url,
      method: "POST",
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
    .then(response => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("typeOfUser", response.data.typeOfUser);
      this.props.onUpdate(response.data.token);
      this.props.history.push("/homeAdmin");
    })
    .catch(error => {
      this.setState({ error: error,
      passsword: "",
    })
    })
    .finally(() => this.setState({ loading: false}));
  }

  handleInput = (event) => {
    let value = event.target.value;
    this.setState({
      [event.target.name]: value,
    })
  }

  render(){
    if (this.state.loading){ return <h3></h3> }

    return(
      <div className="formSignIn">
        <form onSubmit={this.handleSubmit} >
          <div className="contentSignIn">
            <h1 class="SignInHead">Ingreso</h1>
            <div className="field">
              <input type="text" placeholder="Correo Electrónico" value={this.state.email} onChange={this.handleInput} name="email" id="email"/>
            </div>
            <div className="field">
              <input type="password" data-testid="pwd-input" placeholder="Clave" value={this.state.password} onChange={this.handleInput} name="password" id="password"/>
            </div>
            
            <input type="submit" onSubmit={this.handleSubmit} data-testid="submit-btn" id="submit-btn" className="button button-block" placeholder="Ingresar" value="Enviar" />
          </div>
      </form>
    </div> 
    )
  }
}

export default SignIn;
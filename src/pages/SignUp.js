import React from 'react';
import axios from 'axios';
import './SignUp.css'; 

class SignUp extends React.Component{
  constructor(){
    super();
    this.state = {
      name: "",
      surname: "",
      email: "",
      password: "",
      checkPwd: "",
      documentId: ""
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let url = process.env.REACT_APP_SERVER_URL+"/users/signup";
    const { name, surname, email, password, documentId } = this.state;
    axios({
      url,
      method: "POST",
      headers: {  },
      data: {
        name,
        surname,
        email,
        password,
        documentId
      }
    })
    .then(response => {
      this.props.history.push("/login");
    })
    .catch(error => {
      this.setState({
        error: error.response.data.mesage,
      })
    })
    .finally(() => this.setState({ loading: false }))
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render(){
    if (this.state.loading){ return <h3>Loading...</h3>}

    return(
      <div className="form">
        <div className="content">
          <h1>Crea tu Cuenta</h1>
          <form onSubmit={this.handleSubmit} >
            <div className="topRow">
              <div className="field">
                <input id="name" data-testid="name" placeholder="Ingresa tu Nombre" name="name" type="text" value={this.state.name} onChange={this.handleInput} />
              </div>
              
              <div className="field">
                <input id="lastname" placeholder="Ingresa tu Apellido" name="surname" type="text" value={this.state.surname} onChange={this.handleInput} />
              </div>
            </div>

            <div className="field">
              <input id="email" placeholder="Ingresa tu Correo Electrónico" name="email" type="text" value={this.state.email} onChange={this.handleInput} />
            </div>

            <div className="field">
              <input id="password" placeholder="Ingresa tu Clave" name="password" type="password" value={this.state.password} onChange={this.handleInput} />
            </div>

            <div className="field">
              <input id="verifyPassword" placeholder="Ingresa tu Clave de Nuevo" name="checkPwd" type="password" value={this.state.verifyPassword} onChange={this.handleInput} />
            </div>

            <div className="field">
              <input id="documentId" placeholder="Ingresa tu Cédula" name="documentId" type="text" value={this.state.documentId} onChange={this.handleInput} />
            </div>

            <input type="submit" data-testid="button" onSubmit={this.handleSubmit} className="button button-block" value={this.state.postId ? "Actualizar" : "Enviar"} />
            {this.state.error ? <div className="warning">El usuario no pudo ser creado.</div> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default SignUp;
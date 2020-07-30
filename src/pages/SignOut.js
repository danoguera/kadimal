import React from 'react';

class SignOut extends React.Component{
  constructor(){
    super();
    this.state = {
      email: "",
      password: "",
      result: "",
    }
  }

  componentDidMount(){
    localStorage.removeItem("token");
    localStorage.removeItem("typeOfUser");
    this.props.onUpdate("");
    setTimeout(() => this.props.history.push('/'), 500);
  }

  render(){
    if (this.state.loading){ return <h3></h3>}
    return(
      <div></div>
    )
  }
}

export default SignOut;
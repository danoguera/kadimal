import React from 'react';
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom' 
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Products from './pages/Products';
import SignOut from './pages/SignOut';
import HomeAdmin from './pages/HomeAdmin';
import CreateProduct from './pages/CreateProduct';
import Cart from './pages/Cart';
import ListCategory from './pages/ListCategory';
import PayAnswer from './pages/PayAnswer';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      token: ""
    }
  }


  componentDidMount(){
    if (localStorage.getItem("token") !== null){
      this.setState({
        token: localStorage.getItem("token"),
      })
    }
  }
  
  updateTokenStatus = (token) => {
    this.setState({
      token
    });
  }

  render(){
    return(
      <div className="App">
        <Router>
          <NavBar token={this.state.token} />
          <Switch>
            <Route exact path='/' render={(props) => <SignIn {...props} onUpdate={this.updateTokenStatus} /> } />
            <Route exact path='/signin' render={(props) => <SignIn {...props} onUpdate={this.updateTokenStatus} /> } />
            <Route exact path="/home" component={Home}></Route>
            <UserRoute exact path="/products" component={Products}></UserRoute>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/signout" render={(props) => <SignOut {...props} onUpdate={this.updateTokenStatus}/> }/>
            <AdminRoute exact path="/homeAdmin" component={HomeAdmin}></AdminRoute>
            <AdminRoute exact path="/products/create" component={CreateProduct}></AdminRoute>
            <Route exact path="/products/:id" component={Products}></Route>
            <Route exact path="/cart" component={Cart}></Route>
            <Route exact path="/category/:id" component={ListCategory}></Route>
            <Route exact path="/payres" component={PayAnswer}></Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

// function GeneralRoute(props){
//   const token = localStorage.getItem("token");
//   if (!token){
//     return <Redirect to="/signin"></Redirect>
//   }
//   return (<Route { ...props } ></Route>)
// }

function UserRoute(props){
  const token = localStorage.getItem("token");
  const typeOfUser = localStorage.getItem("typeOfUser");
  if(!token){
    return <Redirect to="/login"></Redirect>
  }

  if (token && typeOfUser==="user"){
    return (<Route { ...props } ></Route>)
  }
  return <Redirect to="/homeAdmin"></Redirect>
}

function AdminRoute(props){
  const token = localStorage.getItem("token");
  const typeOfUser = localStorage.getItem("typeOfUser");
  if (!token){
    return <Redirect to="/login"></Redirect>
  }
  if (token && typeOfUser === 'admin'){
    return (<Route { ...props }></Route>);
  }
  return <Redirect to="/home"></Redirect>
}

export default App;

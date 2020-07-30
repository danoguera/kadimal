import React from 'react';
import axios from 'axios';
import './Products.css';
import { Link } from 'react-router-dom';

class Products extends React.Component{
  constructor(){
    super();
    this.state = {
      looading: true,
      error: false,
      quantity: 1
    }
  }

  componentDidMount(){
    this.getProduct();
  }

  getProduct = () => {
    const productId = this.props.match.params.id;

    axios({
      url: process.env.REACT_APP_SERVER_URL + '/products/' + productId,
      method: "GET",
      headers: { "Authorization": localStorage.getItem("token") }
    })
    .then(response => {
      this.setState({ product: response.data, loading: false });
      console.log(response.data);
    })
    .catch(error => {
      this.setState({ error: true })
    })
    .finally(() => this.setState({ loading: false }));
  }

  goBack = () => {
    this.props.history.goBack();
  }

  updateProduct = () => {
    const productId = this.props.match.params.id;
    this.props.history.push("/products/create/"+productId);
  }

  deleteProduct = () => {
    const productId = this.props.maatch.params.id;

    axios({
      url: process.env.REACT_APP_SERVER_URL + "/products" + productId,
      method: "DELETE",
      headers: { "Authorization:": localStorage.getItem("token") }
    })
    .then(response => {
      alert("El producto ha sido borrado.");
      this.props.history.push("/homeAdmin");
    })
    .catch(error => {
      alert("El producto no pudo ser borrado.")
    })
    .finally(() => this.setState({ loading: false }));
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  addToCart = () => {
    const item = { 
      id: this.state.product._id, 
      post_image: this.state.product.post_image,
      quantity: this.state.quantity,
      name: this.state.product.name,
      price: this.state.product.price
    }
    if (localStorage.getItem("cart")===null){
      let myCart=[];
      myCart.push(item);
      localStorage.setItem("cart", JSON.stringify(myCart));
    }else {
      let cart = JSON.parse(localStorage.getItem("cart"));
      const [product] = cart.filter(prod => prod.id===this.state.product._id);
      if (product){
        let cantidad= parseInt(product.quantity) + parseInt(this.state.quantity);
        let modified = {...product, quantity: cantidad};
        cart=cart.map(prod => prod.id===this.state.product._id ? modified : prod);
        localStorage.setItem("cart", JSON.stringify(cart));
      }else {
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  }

  render(){
    const typeOfUser = localStorage.getItem("typeOfUser");
    if (this.state.loading) return (<div className="postContainer"><h3></h3></div>);
    if (this.state.error || !this.state.product) return (<h3>No se puede mostrar información de este producto.</h3>);
    
    return (
      <section className="Prodproducts">
        <div className="individualProduct">
          <img src={this.state.product.post_image} alt="" className="productImg" />
        </div>
        <div className="individualProduct">
          <h1>{this.state.product.name}</h1>
          <h2>Precio: ${this.state.product.price.toLocaleString()}</h2>
          <h3><strong>Existencias:</strong> {this.state.product.amount}</h3> 
          <div class="rowQuant">
          {typeOfUser==="user"?<label className="quantLabel">Necesitas: </label>:""}
          {typeOfUser==="user"?<input className="inputQuant" id="quantity" name="quantity" type="text" placeholder="1" value={this.state.quantity} onChange={this.handleInput} />:""}      
          </div> 
          {typeOfUser==="admin"?<button className="btnProduct" data-testid="post-edit" onClick={this.updateProduct} >Editar </button>:""} 
          {typeOfUser==="admin"?<button data-testid="post-delete" onClick={this.deleteProduct} className="btnProduct">Borrar</button>:""}    
          {typeOfUser==="user"?<button className="btnProduct" onClick={this.addToCart} >Añadir al Carrito</button>:null}
          {typeOfUser==="user"?<button className="btnProduct"><Link to="/cart">Finalizar Compra</Link></button>:null}
          <button onClick={this.goBack} className="btnProduct">Volver </button>
          <h3 className="des">Descripción del Producto:</h3>
          <p>{this.state.product.description}</p>   

        </div>
      </section>
    )
  }
}

export default Products;
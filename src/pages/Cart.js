import React from 'react';
import axios from 'axios';
import './Cart.css';

class Cart extends React.Component{
  constructor(){
    super();
    this.state = {
      loading: true,
      error: false,
      cart: [],
    }
  }

  componentDidMount(){
    this.getUserInfo();
    this.getProductInfo();
    if (localStorage.getItem("cart")===null){
      
    }else {
      let cart= JSON.parse(localStorage.getItem("cart"));
      this.setState({cart});
    }
    this.setState({
      newCart: this.state.cart,
    })
  }

  getProductInfo = () =>{

    const productId = this.props.match.params.id;

    axios({
        url: process.env.REACT_APP_SERVER_URL + "/products/" + productId,
        method: "GET",
        headers: { "Authorization": localStorage.getItem("token") } 

    })
      .then(response => {
           this.setState({post: response.data, loading: false});
       })
      .catch(error => {
        this.setState({error: true} );
       })
      .finally(() => this.setState({loading: false})); 
} 

  getUserInfo = () =>{

    axios({
        url: process.env.REACT_APP_SERVER_URL + "/users/get",
        method: "GET",
        headers: { "Authorization": localStorage.getItem("token") } 
    })
      .then(response =>{
           this.setState({user: response.data, loading: false});
       } )
      .catch(error =>{
        this.setState({error: true} )
       
       } )
      .finally( () => this.setState({loading: false})); 
} 

  handlePayment = (event) => {
    const handler = window.ePayco.checkout.configure({
        key: process.env.REACT_APP_EPAYCO_PUBLIC,
        test: true,
      });

      handler.open({
        external: 'false',
        amount: this.getTotal(),
        tax: '0',
        tax_base: '0',
        name: 'Pago Producto',
        description: 'Pago Producto - Kadimal',
        currency: 'cop',
        country: 'CO',
        lang: 'en',
        invoice: '123456',
        extra1: 'extra 1',
        extra2: 'extra 2',
        extra3: 'extra 3',
        response: process.env.REACT_APP_RESPONSE_URL,
        methodsDisable: [],
        email_billing: this.state.user.email, 
        name_billing: this.state.user.name + " " +this.state.user.surname,
        address_billing: '',
        type_doc_billing: 'cc',
        mobilephone_billing: '',
        number_doc_billing: this.state.user.documentId,
      });
    }

    goBack = () => {
      this.props.history.goBack();
    }

    getTotal = () => {
      let sum = 0;
      if (this.state.cart.length > 0) {
        for (let i=0; i<this.state.cart.length; i++){
          sum += (this.state.cart[i].price * this.state.cart[i].quantity);
        }
      }
      return sum;
    }

    handleInput = (event) => {
      // console.log("El usuario esta modificiando el producto", event.target.id);
      this.addToCart(event.target.id,event.target.value);
    }

    addToCart = (productId,quantity) => {
      if (localStorage.getItem("cart")===null){
      }else {
        let cart= JSON.parse(localStorage.getItem("cart"));
        const [product] = cart.filter(prod => prod.id===productId);
        if (product){
          let cantidad= parseInt(quantity);
          let modified = {...product, quantity: cantidad};
          cart=cart.map(prod => prod.id===productId ? modified : prod);
          localStorage.setItem("cart", JSON.stringify(cart));
          this.setState({cart});
        }
      }
    }

    deleteItem = (event) => {
      let cart= JSON.parse(localStorage.getItem("cart"));
      const product = cart.filter(prod => prod.id!==event.target.id);
      this.setState({
      cart: product,
      })
      localStorage.setItem("cart", JSON.stringify(product));
    }



  render(){

    let sum = 0;
    
    if (this.state.cart.length > 0) {
      for (let i=0; i<this.state.cart.length; i++){
        sum += (this.state.cart[i].price * this.state.cart[i].quantity);
      }
    }
      
    return (
      <section className="containerCart content-section">
        <h1 class="carTitle">Carrito de Compras</h1>
        <div className="cart-row">
          <span className="cart-item cart-header cart-column">Producto</span>
          <span className="cart-quantity cart-header cart-column">Cantidad</span>
          <span className="cart-price cart-header cart-column">Precio</span>
        </div>
        {this.state.cart && this.state.cart.length>0 && this.state.cart.map(item =>
        <div className="cart-items" key={item.id}>
          <div className="cart-row">
            <div className="cart-item cart-column">
              <img src={item.post_image} className="cart-item-image" alt="" />
              <span className="cart-item-title">{item.name}</span>
            </div>
            <div className="cart-quantity cart-column">
              <input id={item.id} className="cart-quantity-input" name="numberItems" type="number" min="1" max="10" defaultValue={item.quantity} onChange={this.handleInput} />
            </div>
            <span className="cart-price cart-price1">${(item.quantity * item.price).toLocaleString()}</span>
            <button className="btnCart btnCart-danger" type="button" onClick={this.deleteItem} id={item.id} >ELIMINAR</button>
          </div>
        </div>
        )}
        <div className="cart-total">
            <strong className="cart-total-title">Total a pagar:</strong>
            <span className="cart-total-price">${sum.toLocaleString()}</span>
        </div>

        <div className="row">
          <button className="btnCart btnCart-primary btnCart-purchase" type="button" onClick={this.handlePayment}>Pagar</button>
          <button onClick={this.goBack} className="btnCart btnCart-primary btnCart-purchase" >Volver</button>
        </div>
      </section>
    )
  }
}
  export default Cart;
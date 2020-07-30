import React from 'react';
import axios from 'axios';
import './ListCategory.css';
import { waitForElement } from '@testing-library/react';

class ListCategory extends React.Component{
    constructor(){
      super();
      this.state = {
        loading: true,
        error: false,
        products:[], 
      } 
    } 

    componentDidMount(){
      const category = this.props.location.pathname;
        axios({
          url: process.env.REACT_APP_SERVER_URL + "/products" + category,
          method: "GET",
          headers: { "Authorization": localStorage.getItem("token") } 
      })
      .then(response => {
        this.setState({ products: response.data})
      })
      .catch(error => {
        localStorage.removeItem("token");
        this.props.history.push("/login");
        this.setState({ error: true })
      })
      .finally(() => this.setState({loading: false})); 
    }

    handleSubmit = (event) => {
        this.props.history.push("/products/"+event.target.value);
    } 

    render(){
      if (this.state.loading){return <h1></h1>};
      if (this.state.error){return <h1>Something went wrong..</h1>}  

      let products = this.state.products;

      return (
        <React.Fragment>
          <h2 className="productsTitle">Productos de la Categoría:</h2>
          <section class="products">
          {products && products.length > 0 && products.map(product => (
            <div className="productItem" data-testid="product" key={product._id}>
              <div className="productItemImg">             
                <img src={product.post_image.indexOf("http") >= 0 ? product.post_image : require(`../assets/images/${product.post_image}`)} alt="" className="listsPic" />
              </div> 
              <p className="productName">{product.name}</p>
              <p className="productDescription">{product.description}</p>
              <p className="productPrice">${product.price.toLocaleString()}</p>
              <button type="button" class="btn" data-testid="product-view" value={product._id} onClick={this.handleSubmit}>Ver Producto</button>
            </div>
          ))}
          </section>
        </React.Fragment>
      )
    }
} 

export default ListCategory;
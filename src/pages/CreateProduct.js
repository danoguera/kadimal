import React from 'react';
import axios from 'axios';
import './CreateProduct.css';

class CreateProduct extends React.Component{
  constructor(){
    super();
    this.state = {
      name: "",
      reference: "",
      description: "",
      price: "",
      amount: "",
    }
  }

  componentDidMount(){
    const productId = this.props.match.params.id;
    if (productId){
      axios({
        url: process.env.REACT_APP_SEREVER_URL+"/products"+productId,
        method: "GET",
        headers: { "Authorization": localStorage.getItem("token")},
      })
      .then(response => {
        const { name, reference, description, price, amount } = response.data;
        this.setState({
          name, reference, description, price, amount, productId: productId
        });
      })
      .catch(error => {
        this.setState({ error: error })
      })
      .finally(() => this.setState({ loading: false }));
    }
  }

  handleSelect = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = async(event) => {
    event.preventDefault();
    let method, url;
    if (this.state.productId){
      method = "PUT";
      url=process.env.REACT_APP_SERVER_URL+"/products/"+this.state.productId;
    } else{
      method = "POST";
      url = process.env.REACT_APP_SERVER_URL+"/products/";
    }
    const formD = new FormData();
    if (this.state.selectedFile) {
      formD.append('photo', this.state.selectedFile,"photo");
    }

    const { name, reference, category, description, price, amount } = this.state;

    formD.set("name", name);
    formD.set("reference", reference);
    formD.set("category", category);
    formD.set("description", description);
    formD.set("price", price);
    formD.set("amount", amount);
    
    axios({
      url,
      method,
      headers: { "Authorization": localStorage.getItem("token"), 'Content-Type': 'multipart/form-data' },
      data: formD,
    })
    .then(response => {
      this.props.history.push("/products/"+response.data._id);
    })
    .catch(error => {
      alert("No es posible crear/editar el producto");
      this.setState({ 
        error: error, 
        pasword: "",
      })
    })
    .finally(() => this.setState({ loading: false }));
  }

  fileSelectedHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    })
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render(){
    if (this.state.loading){return <h1></h1>}
    return(
      <div className="formNewProd">
        <div className="contentNewProd">
          <h1>Ingresa un Producto Nuevo</h1>
          <form onSubmit={this.handleSubmit} >
          
          <div className="fieldNewProd">
            <input id="name" name="name" type="text" data-testid="product-name" placeholder="Ingresa el Nombre del Producto" value={this.state.name} onChange={this.handleInput} />
          </div>

          <div className="fieldNewProd">
          <input id="reference" name="reference" type="text" data-testid="product-reference" placeholder="Ingresa la Referencia del Producto" value={this.state.reference} onChange={this.handleInput} />
          </div>

          <div className="fieldNewProd">
          <textarea id="description" name="description" className="textBoxNewProd" placeholder="Ingresa la Descripción del Producto" value={this.state.description} onChange={this.handleInput} />
          </div>

          <div className="fieldNewProd">
          <select name="category" data-testid="category" value={this.state.category} onChange={this.handleSelect} id="category">
              <option value="">Escoge la Categoría del Producto</option>
              <option value="Suspension">Suspensión</option>
              <option value="Break">Freno</option>
              <option value="Accessory">Accesorio</option>
          </select>
          </div>

          <div className="topRow">
            <div className="fieldNewProd">
              <input id="price" name="price" type="text" data-testid="price" placeholder="Precio del Producto" value={this.state.price} onChange={this.handleInput} />
            </div>  
            <div className="fieldNewProd">
              <input id="amount" name="amount" type="text" data-testid="amount" placeholder="Unidades del Producto" value={this.state.amount} onChange={this.handleInput} />
            </div>
          </div>
          
          <div className="fieldNewProd">
            <input id="post_image" name="post_image" data-testid="post_image" type="file" value={this.state.post_image_ooo} onChange={this.fileSelectedHandler} />
            <label htmlFor="post_image">
              <span className="material-icons">cloud_upload</span>
              <p>Sube una foto del producto</p>
            </label>
          </div>

          <input type="submit" className="button button-block" data-testid="submit-btn" onSubmit={this.handleSubmit} value={this.state.productId ? "Actualizar" : "Enviar"} />
        </form>
      </div>
    </div>
    )
  }
}

export default CreateProduct;
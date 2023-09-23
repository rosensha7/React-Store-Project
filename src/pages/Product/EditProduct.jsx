import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {

    const [product, setProduct] = useState({});
    const [successMessage, setSuccessMessage] = useState(false);
    const {id} = useParams();
    const storeProducts = useSelector(state => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      const index = storeProducts.findIndex(prod => prod.id == +id);
      if(index > -1){
        setProduct(storeProducts[index]);
      } else {
        console.log('No product exists with ID ', id);
      }
    }, [id]);

    const handleInput = (e) => {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch({ type: 'PRODUCT_UPDATE', payload: product});
      setSuccessMessage(true)
      navigate(-1)
    };

    return (
      <div style={{border: '1px solid black', width: '40%', padding: '10px 10px'}}>
        <form onSubmit={handleSubmit}>
            Product Name:{' '}
            <input value={product.name} type='text' name='name' onInput={handleInput} required style={{margin: '10px 10px'}}/>
            <br />
            Quantity: <input value={product.quantity} type='text' name='quantity' onInput={handleInput} style={{margin: '10px 10px'}}/>
            <br />
            Price: <input value={product.price} type='text' name='price' onInput={handleInput} style={{margin: '10px 10px'}}/>
            <br />
            {successMessage && <h2>Product successfully updated!</h2>}
            <button type='submit'>Apply</button>
        </form>
      </div>
    );
  }
  
  export default EditProduct;

import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import CustomerAction from '../Customer/CustomerAction';
import { Link } from 'react-router-dom';

const ProductDetails = (props) => {

    const [product, setProduct] = useState({name: '', price: '', quantity: ''});
    const storePurchases = useSelector(state => state.purchases);

    useEffect(() => {
        setProduct(props.data);
    }, [props, storePurchases]);

    return (
      <div style={{border: '1px solid black', width: '30%', margin: '10px 10px', padding: '10px 10px', background: 'lightblue'}}>
      <h5>Product Name: {' '}
        <Link to={'/edit/product/' + product.id}>{product.name}</Link>
      </h5>
      <h5>Product Price: {product.price}</h5>
      <h5>Product Quantity: {product.quantity}</h5>

      <h5>Customers:</h5>
      {storePurchases.map(purchase => {
            if(purchase.productId === props.data.id){
                return (<CustomerAction key={purchase.id} purchase={purchase}/>)
            }
        })
      }
      </div>
    );
  }
  
  export default ProductDetails;

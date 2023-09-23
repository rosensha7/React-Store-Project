import React from 'react'
import { useSelector } from "react-redux";
import ProductDetails from './ProductDetails';

const ProductDetailsList = () => {

    const storeData = useSelector(state => state.products);

    return (
      <div>
      <h2>Products Details List</h2>
        {storeData.map(product => {
            return (
                <ProductDetails key={product.id} data={product}/>
            )
        })}
      </div>
    );
  }
  
  export default ProductDetailsList;

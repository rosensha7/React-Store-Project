import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import ProductDetailsList from './ProductDetailsList';

const Products = () => {

    const storeData = useSelector(state => state.products);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(()=>{
      setTotalProducts(storeData.length)
    }, [storeData])

    return (
      <div>
      <h1>Products</h1>
      <h4>Total Products: {totalProducts}</h4>
        <div>
            <ProductDetailsList />
        </div>
      </div>
    );
  }
  
  export default Products;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

const CustomerProductAction = (props) => {

    const [customer, setCustomer] = useState({});
    const [chosenProduct, setChosenProduct] = useState({});
    const storeProducts = useSelector(state => state.products);
    const dispatch = useDispatch();
    
    useEffect(() => {
      setCustomer(props.customer);
    }, [props]);

    useEffect(() => {
      productChange(chosenProduct.id)
    }, [storeProducts]);

    const productChange = (newProd) =>{
      const prodIndex = storeProducts.findIndex((prod)=>prod.id === +newProd);
      prodIndex !== -1 ? setChosenProduct(storeProducts[prodIndex]) : setChosenProduct(chosenProduct);
    }

    const doPurchase = () => {
      const uuid = uuidv4();
      const newPurchase = { 
        id: uuid, customerId: customer.id, productId: chosenProduct.id, date: getTodaysDate()
      }
      if(chosenProduct.quantity === 0){
        console.log('No quantity left!');
      } else {
        dispatch({ type: 'PURCHASE', payload: newPurchase });
        dispatch({ type: 'PRODUCT_UPDATE', payload: {...chosenProduct, quantity: chosenProduct.quantity - 1} })
      }
    };

    const getTodaysDate = () => {
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      return formattedDate;
    }

    return (
      <div>
          <select defaultValue={''} type='text' onChange={(e) => {productChange(e.target.value)}}> 
          <option value=''>Choose Product</option>
          {storeProducts.map(product => {
            if(product.quantity > 0) {
              return (
                <option key={product.id} value={product.id}>{product.name}</option>
              )
            }
          })}
        </select>
        <button onClick={doPurchase} style={{float: 'right', backgroundColor: 'beige'}}>SAVE</button>
      </div>
    );
  }
  
  export default  CustomerProductAction;

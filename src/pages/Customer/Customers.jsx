import { useSelector } from "react-redux";
import SummaryTable from "../SummaryTable";
import { useEffect, useState } from "react";
import Utils from "../../Utils/Utils";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

const Customers = () => {

  const storeProducts = useSelector(state => state.products);
  const storeCustomers = useSelector(state => state.customers);
  const storePurchases = useSelector(state => state.purchases);
  const [dataSource, setDataSource] = useState([{customerId: '', customerName: '', productId: '', productName: '', date: '', id: ''}]);
  const [showPurchase, setShowPurchase] = useState(false);
  const [chosenCustomer, setChosenCustomer] = useState({});
  const [chosenProduct, setChosenProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(()=>{
    let summarizedData = Utils.summarizeData(storeProducts, storeCustomers, storePurchases);
    setDataSource(summarizedData);
  }, [storePurchases])

  const handleBuyClick = ()=>{
    setShowPurchase(!showPurchase);
  }

  const customerChanged = (value)=>{
    const index = storeCustomers.findIndex(cust => cust.id === +value);
    index !== -1 ? setChosenCustomer(storeCustomers[index]) : setChosenCustomer({});
  }

  const productChanged = (value)=>{
    const index = storeProducts.findIndex(prod => prod.id === +value);
    index > -1 ? setChosenProduct(storeProducts[index]) : setChosenProduct({});
  }

  const handleNewPurchase = ()=>{
    dispatch({
      type: 'PURCHASE',
      payload: {
        id: uuidv4(), 
        customerId: chosenCustomer.id, 
        productId: chosenProduct.id, 
        date: Utils.formatDate()
      }
    });
  }

  return (
    <div>
    <h1>Customers</h1>
      <div>
        <SummaryTable data={dataSource}></SummaryTable>
      </div>
      <div>
        <button onClick={handleBuyClick}>Buy Product</button>
      </div>
      {showPurchase && <div>
          <select defaultValue={''} type='text' onChange={(e) => {customerChanged(e.target.value)}}>
            <option value=''>Choose Customer</option>
            {storeCustomers.map(customer => {
              return(
                <option key={customer.id} value={customer.id}>{customer.firstName + ' ' + customer.lastName}</option>
              )
            })}
          </select>

          <select defaultValue={''} type='text' onChange={(e) => {productChanged(e.target.value)}}>
          <option value=''>Choose Product</option>
            {storeProducts.map(product => {
              return(
                <option key={product.id} value={product.id}>{product.name}</option>
              )
            })}
          </select>
          <br/>
          <button onClick={handleNewPurchase}>BUY</button>
        </div>}
        
    </div>
  );

}
  
export default Customers;

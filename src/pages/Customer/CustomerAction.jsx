import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomerProductAction from "./CustomerProductAction";
import { Link } from "react-router-dom";

const CustomerAction = (props) => {

    const [customer, setCustomer] = useState({});
    const [purchaseVisible, setPurchaseVisible] = useState(false);
    const storeData = useSelector(state => state.customers);

    useEffect(() => {
      const index = storeData.findIndex(cust => cust.id === props.purchase.customerId);
      if(index !== -1){
        const cust = storeData[index];
        setCustomer(cust);
      }
    }, [props, storeData]);

    return (
      <div style={{border: '1px solid black', background: 'lightgray', width: '70%', margin: '10px 50px 10px 50px', padding: '10px 10px'}}>
        <h5>Customer Name: {' '}
          <Link to={'/edit/customer/' + props.purchase.customerId}>{customer.firstName + ' ' + customer.lastName}</Link>
        </h5>
        <h5>Customer Purchase Date: {props.purchase.date}</h5>
        <button onClick={() => setPurchaseVisible(true)}>ADD</button>
        {purchaseVisible && <div>
          <CustomerProductAction key={customer.id} customer={customer}/>
        </div>}
      </div>
    );
  }
  
  export default CustomerAction;

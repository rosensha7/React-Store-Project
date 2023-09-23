import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';

const EditCustomer = () => {

    const [customer, setCustomer] = useState({});
    const [successMessage, setSuccessMessage] = useState(false);
    const {id} = useParams();
    const storeCustomers = useSelector(state => state.customers);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      const index = storeCustomers.findIndex(cust => cust.id == +id);
      if(index > -1){
        setCustomer(storeCustomers[index]);
      } else {
        console.log('No customer exists with ID ', id);
      }
    }, [id]);

    const handleInput = (e) => {
      const { name, value } = e.target;
      setCustomer({ ...customer, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch({ type: 'CUSTOMER_UPDATE', payload: customer});
      setSuccessMessage(true)
      navigate(-1)
    };

    return (
      <div style={{border: '1px solid black', width: '40%', padding: '10px 10px'}}>
        <h3>Edit Customer</h3>
        <form onSubmit={handleSubmit}>
            Customer First Name:{' '}
            <input value={customer.firstName} type='text' name='firstName' onInput={handleInput} required style={{margin: '10px 10px'}}/>
            <br />
            Last Name: <input value={customer.lastName} type='text' name='lastName' onInput={handleInput} style={{margin: '10px 10px'}}/>
            <br />
            City: <input value={customer.city} type='text' name='city' onInput={handleInput} style={{margin: '10px 10px'}}/>
            <br />
            {successMessage && <h2>Customer successfully updated!</h2>}
            <button type='submit'>Apply</button>
        </form>
      </div>
    );
  }
  
  export default EditCustomer;

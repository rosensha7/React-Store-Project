import { useSelector } from "react-redux";
import SummaryTable from "./SummaryTable";
import { useEffect, useState } from "react";
import Utils from "../Utils/Utils";

const Purchases = () => {

  const storeProducts = useSelector(state => state.products);
  const storeCustomers = useSelector(state => state.customers);
  const storePurchases = useSelector(state => state.purchases);
  const [chosenCustomer, setChosenCustomer] = useState({});
  const [chosenProduct, setChosenProduct] = useState({});
  const [chosenDate, setChosenDate] = useState({});
  const [filteredData, setFilteredData] = useState([{customerId: '', customerName: '', productId: '', productName: '', date: '', id: ''}]);
  const [dataSource, setDataSource] = useState([{customerId: '', customerName: '', productId: '', productName: '', date: '', id: ''}]);
  const [totalPurchases, setTotalPurchases] = useState(0);

  useEffect(()=>{
    let summarizedData = Utils.summarizeData(storeProducts, storeCustomers, storePurchases);
    setDataSource([...summarizedData]);
    setFilteredData([...summarizedData])
    
  }, []);

  useEffect(()=>{
    setTotalPurchases(storePurchases.length);
  }, [storePurchases]);

  const productChanged = (newProd)=> {
    const productIndex = storeProducts.findIndex(product=>product.id === +newProd)
    productIndex !== -1 ? setChosenProduct(storeProducts[productIndex]) : setChosenProduct({});
  }

  const customerChanged = (newCust)=> {
    const customerIndex = storeCustomers.findIndex(customer=>customer.id === +newCust)
    customerIndex !== -1 ? setChosenCustomer(storeCustomers[customerIndex]) : setChosenCustomer({});
  }

  const dateChanged = (newDate)=> {
    if(newDate){
      let formattedDate = Utils.formatDate(newDate);
      setChosenDate({date: formattedDate});
    }
  }

  const handleSubmit = ()=> {
    let filtered = filterData(chosenProduct, chosenCustomer, chosenDate);
    setFilteredData([...filtered]);
  }

  const filterData = (prodFilter, custFilter, dateFilter) => {
    let filtered = [...dataSource];
    if(prodFilter.id){
      filtered = filtered.filter(purchase => purchase.productId === prodFilter.id);
    }
    if(custFilter.id){
      filtered = filtered.filter(purchase => purchase.customerId === custFilter.id);
    }
    if(dateFilter.date){
      filtered = filtered.filter(purchase => purchase.date === dateFilter.date);
    }
    return filtered;
  }

  return (
    <div>
      <h1>Purchases</h1>
      <h4>Total Purchases: {totalPurchases}</h4>
        <div>
          <select defaultValue={''} type='text' onChange={(e) => {productChanged(e.target.value)}}>
            <option value='all'>All Products</option>
            {storeProducts.map(product=>{
              return (
                <option key={product.id} value={product.id}>{product.name}</option>
              )
            })}
          </select>
          <select defaultValue={''} type='text' onChange={(e) => {customerChanged(e.target.value)}}>
            <option value='all'>All Customers</option>
              {storeCustomers.map(customer => {
                return (
                  <option key={customer.id} value={customer.id}>{customer.firstName + ' ' + customer.lastName}</option>
                )
              })}
          </select>
          <input type='date' id="dateInput" placeholder="Enter a date" onInput={(e) => dateChanged(e.target.value)} />
          <button onClick={handleSubmit}>Search</button>
        </div> 
        <SummaryTable data={filteredData}></SummaryTable>
    </div>
  );


}
  
export default Purchases;

import { useSelector } from "react-redux";

const summarizeData = (storeProducts, storeCustomers, storePurchases)=> {
    let data = storePurchases.map(purchase => {
        const purchasedProduct = storeProducts.find(product => product.id === purchase.productId);
        const purchasingCustomer = storeCustomers.find(customer => customer.id === purchase.customerId);
        if(purchasedProduct && purchasingCustomer){
          return {...purchase, customerName: purchasingCustomer.firstName + ' ' + purchasingCustomer.lastName, productName: purchasedProduct.name};
        } else {
          console.log('Something is wrong. Purchase details: ', purchase);
        }
        });
        return data;
}

const formatDate = (date = new Date())=>{
    return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default {summarizeData, formatDate};

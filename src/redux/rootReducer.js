const initialState = {
    products: [
        { id: 1, name: 'Hat', price: 20, quantity: 10 },
        { id: 2, name: 'T-Shirt', price: 100, quantity: 15 },
        { id: 3, name: 'Sneakers', price: 50, quantity: 6 },
        { id: 4, name: 'Socks', price: 3, quantity: 50 },
        { id: 5, name: 'Sunglasses', price: 500, quantity: 7 }
    ],
    customers: [
        { id: 1, firstName: 'Leo', lastName: 'Messi', city: 'Barcelona' },
        { id: 2, firstName: 'Cristiano', lastName: 'Ronaldo', city: 'Madrid' },
        { id: 3, firstName: 'Kylian', lastName: 'Mbappe', city: 'Paris' },
    ],
    purchases: [
        { id: 1, customerId: 1, productId: 1, date: '20/03/2023' },
        { id: 2, customerId: 2, productId: 1, date: '24/03/2023' },
        { id: 3, customerId: 2, productId: 2, date: '21/03/2023' }
]
};

const applyProductInventoryChange = (state = initialState, action) => {
    let products = [...state.products];
    let customers = [...state.customers];
    switch (action.type) {
        case 'PURCHASE':
            return {...state, purchases: [...state.purchases, action.payload] };

        case 'PRODUCT_UPDATE':
            let updateProductIndex = products.findIndex(product => product.id === action.payload.id);
            if (updateProductIndex !== -1) {
                products[updateProductIndex] = action.payload
            }
            if(action.payload.quantity < 0){
                return { ...state }
            }
            return { ...state, products: products };

        case 'PRODUCT_DELETE':
            let deleteProdIndex = products.findIndex(product => product.id === action.payload.id);
            if ( deleteProdIndex !== -1) {
                products = products.splice(deleteProdIndex, 1);
            }
        return { ...state, products: products };

        case 'CUSTOMER_UPDATE':
            let updateCustomerIndex = customers.findIndex(customer => customer.id === action.payload.id);
            if( updateCustomerIndex !== -1 ){
                customers[updateCustomerIndex] = action.payload
            }
            return { ...state, customers: customers };

         case 'CUSTOMER_DELETE':
            let deleteCustIndex = customers.findIndex(customer => customer.id === action.payload.id);
            if ( deleteCustIndex !== -1) {
                customers = customers.splice(deleteCustIndex, 1);
            }
        return { ...state, customers: customers };    
            
        default:
            return state;
    }
};

export default applyProductInventoryChange;

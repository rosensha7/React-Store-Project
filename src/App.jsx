import { Route, Routes } from 'react-router-dom';
import MainMenu from './pages/MainMenu';
import Products from './pages/Product/Products';
import Customers from './pages/Customer/Customers';
import Purchases from './pages/Purchases';
import EditProduct from './pages/Product/EditProduct';
import EditCustomer from './pages/Customer/EditCustomer';

function App() {

  return (
    <div>
    <Routes>
      <Route path='/' element={<MainMenu/>} />
      <Route path='/products' element={<Products/>} />
      <Route path='/customers' element={<Customers/>} />
      <Route path='/purchases' element={<Purchases/>} />
      <Route path='/edit/customer/:id' element={<EditCustomer/>} />
      <Route path='/edit/product/:id' element={<EditProduct/>} />
      <Route path='/*' element={<Customers/>}/>
    </Routes> 
    </div>
  );
}

export default App;

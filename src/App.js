import './style/all.scss'
import { Route,Routes} from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminOrders from './pages/admin/AdminOrders';
import FrontLayout from './pages/front/FrontLayout';
import Home from './pages/front/Home';
import Products from './pages/front/Products';
import ProductDetail from './pages/front/ProductDetail';
import Cart from './pages/front/Cart';
import Form from './pages/front/Form';
import OrderSuccess from './pages/front/OrderSuccess';

function App() {

  return (
    <div className="App">
     <Routes>
        <Route path='/' element={<FrontLayout />}>
          <Route path='' element={<Home />}></Route>
          <Route path='products' element={<Products />}></Route>
          <Route path='product/:id' element={<ProductDetail />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='form' element={<Form />}></Route>
          <Route path='order/:orderId' element={<OrderSuccess />}></Route>
        </Route>
        <Route path='/adminLogin' element={< AdminLogin/>}></Route>
        <Route path='/admin' element={<Dashboard />}>
            <Route path='products' element={<AdminProducts />}></Route>
            <Route path='coupons' element={<AdminCoupons />}></Route>
            <Route path='orders' element={<AdminOrders />}></Route>
        </Route>
     </Routes>
      
    </div>
  );
}

export default App;

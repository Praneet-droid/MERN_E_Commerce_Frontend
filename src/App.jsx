import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ProductDetail from './component/product/ProductDetail';
import ShowProduct from "./component/product/ShowProduct";
import Navbar from './component/user/Navbar';
import './index.css';
import SearchProduct from './component/product/SearchProduct';
import Register from './component/user/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './component/user/Login';
import Profile from './component/user/Profile';
import Cart from './component/user/Cart';
import Checkout from './component/user/Checkout';
import ShippingAddress from './component/user/ShippingAddress';
import OrderConfirmation from './component/user/OrderConfirmation';
function App() {

  
  return (
    <div >
     <Router>
      <Navbar/>
      <ToastContainer />
      <Routes>
         <Route path='/' element={<ShowProduct/>}></Route>
         <Route path='/product/:id' element={<ProductDetail/>}></Route>
         <Route path='/product/search/:term' element={<SearchProduct/>}></Route>
         <Route path='/register' element={<Register/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
         <Route path='/profile' element={<Profile/>}></Route>
         <Route path='/cart' element={<Cart/>}></Route>
         <Route path='/shipping' element={<ShippingAddress/>}></Route>
         <Route path='/checkout' element={<Checkout/>}></Route>
         <Route path='/orderconfirmation' element={<OrderConfirmation/>}></Route>
      </Routes>
     </Router>
    </div>
  )
}

export default App

import { Provider } from 'react-redux'
import store from './store' // ajustá el path si está en otra carpeta
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from './containers/Home';
import Error404 from './containers/errors/Error404';

import Signup from './containers/auth/Signup';
import Activate from './containers/auth/Activate';
import Loing from './containers/auth/Login';

import ResetPassword from './containers/auth/ResetPassword';
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm';
import Shop from './containers/Shop';
import ProductDetail from './containers/pages/ProductDetail';

import Search from './containers/pages/Search';
import Cart from './containers/pages/Cart';
import Checkout from './containers/pages/Checkout';
import ThankYou from './containers/pages/ThankYou';
import Dashboard from './containers/pages/Dashboard';
import DashboardPayments from './containers/pages/DashboardPayments';
import DashboardPaymentDetail from './containers/pages/DashboardPaymentDetail';



function App() {
  return (
    <>

    <Provider store={store}>
   
      <Router>
        <Routes>
          <Route path="*" element={<Error404/>}></Route>

          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/cart" element={<Cart/>}></Route>
          <Route exact path='/checkout' element={<Checkout/>}/>

          <Route exact path='/thankyou' element={<ThankYou/>}/>
          <Route exact path='/dashboard' element={<Dashboard/>}/>
          <Route exact path='/dashboard/payments' element={<DashboardPayments/>}/>
          <Route exact path='/dashboard/payment/:transaction_id' element={<DashboardPaymentDetail/>}/>

          {/* Authentication */}
          <Route exact path="/signup" element={<Signup/>}></Route>
          <Route exact path="/login" element={<Loing/>}></Route>
          <Route exact path="/activate/:uid/:token" element={<Activate/>}></Route>
          <Route exact path="/reset_password" element={<ResetPassword/>}></Route>
          <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>}></Route>

          <Route exact path="/shop" element={<Shop/>}></Route>
          <Route exact path="/product/:productId" element={<ProductDetail/>}></Route>
          <Route exact path="/search" element={<Search/>}></Route>
        </Routes>
      </Router>

    </Provider>
      
      
    </>
  )
}

export default App

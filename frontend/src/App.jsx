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




function App() {
  return (
    <>

    <Provider store={store}>
   
      <Router>
        <Routes>
          <Route path="*" element={<Error404/>}></Route>
          <Route exact path="/" element={<Home/>}></Route>

          {/* Authentication */}
          <Route exact path="/signup" element={<Signup/>}></Route>
          <Route exact path="/login" element={<Loing/>}></Route>
          <Route exact path="/activate/:uid/:token" element={<Activate/>}></Route>
          <Route exact path="/reset_password" element={<ResetPassword/>}></Route>
          <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm/>}></Route>

          <Route exact path="/shop" element={<Shop/>}></Route>
        </Routes>
      </Router>

    </Provider>
      
      
    </>
  )
}

export default App

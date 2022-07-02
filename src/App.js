import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import All from './components/All/All';
import { ContextProvider } from './Context/GlobalContext';
import ProductDescription from './components/ProductDescription/ProductDescription';
import CartPage from './components/CartPage/CartPage';
import CategoryWiseProducts from './components/CategoryWiseProducts/CategoryWiseProducts'




class App extends Component {

  render() {
    return (
      <div>
        <ContextProvider>
          <Navbar></Navbar>
          <Routes>
            <Route path='/' element={<All></All>}></Route>
            <Route path='/:categoryName' element={<CategoryWiseProducts />}></Route>
            <Route path='/cartPage' element={<CartPage></CartPage>}></Route>
            <Route path='/productDescription/:id' element={<ProductDescription />}></Route>
          </Routes>
        </ContextProvider>
      </div>
    );
  }
}

export default App;

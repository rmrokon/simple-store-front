import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import All from './components/All/All';
import Home from './components/Home/Home';
import Clothes from './components/Clothes/Clothes';
import Tech from './components/Tech/Tech';
import { ContextProvider } from './Context/GlobalContext';
import ProductDescription from './components/ProductDescription/ProductDescription';
import CartPage from './components/CartPage/CartPage';




class App extends Component {

  render() {
    return (
      <div>
        <ContextProvider>
          <Navbar></Navbar>
          <Routes>
            <Route path='/all' element={<All></All>}></Route>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/clothes' element={<Clothes></Clothes>}></Route>
            <Route path='/tech' element={<Tech></Tech>}></Route>
            <Route path='/cartPage' element={<CartPage></CartPage>}></Route>
            <Route path='/productDescription/:id' element={<ProductDescription />}></Route>
          </Routes>
        </ContextProvider>
      </div>
    );
  }
}

export default App;

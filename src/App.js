import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import All from './components/All/All';
import Home from './components/Home/Home';
import Clothes from './components/Clothes/Clothes';
import Tech from './components/Tech/Tech';
import { CurrencyProvider } from './Context/CurrencyContext';




class App extends Component {

  render() {
    return (
      <div>
        <CurrencyProvider>
          <Navbar></Navbar>
          <Routes>
            <Route path='/all' element={<All></All>}></Route>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/clothes' element={<Clothes></Clothes>}></Route>
            <Route path='/tech' element={<Tech></Tech>}></Route>
          </Routes>
        </CurrencyProvider>
      </div>
    );
  }
}

export default App;

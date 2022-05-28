import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import All from './components/All/All';
import Home from './components/Home/Home';




class App extends Component {

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Routes>
          <Route path='/all' element={<All></All>}></Route>
          <Route path='/' element={<Home></Home>}></Route>

        </Routes>
      </div>
    );
  }
}

export default App;

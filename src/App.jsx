import React, { useState } from 'react';
import Layout from './layouts/Layout';
import LandingPage from './pages/LandingPage/LandingPage';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import Manage from './pages/Manage/Manage';
import ManageKomputer from './pages/ManageKomputer/ManageKomputer';
import KelolaStatusLaporan from './pages/KelolaStatusLaporan/KelolaStatusLaporan';

function App() {
  return (
    <>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={ <LandingPage /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
          <Route path='/dashboard' element={ <Dashboard /> } />
          <Route path='/manage' element={ <Manage /> } />
          <Route path='/manage/:labId' element={ <ManageKomputer /> } />
          <Route path='/manage/:labId/:idpc' element={ <KelolaStatusLaporan /> } />

        </Routes>
      </Layout>
    </BrowserRouter>
    </>
  );
}

export default App;

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
import { Provider } from 'react-redux';
import store from './redux/store';
import PrivateRoute from './routes/PrivateRoute';
import Logout from './pages/Logout/Logout';
import GuestRoute from './routes/GuestRoute';
import GuestLaporan from './pages/GuestLaporan/GuestLaporan';
import AiChat from './pages/AiChat/AiChat';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/' element={ <LandingPage /> } />
              <Route path='' element={ <LandingPage /> } />
              <Route element={ <GuestRoute /> }>
                <Route path='/login' element={ <Login /> } />
                <Route path='/register' element={ <Register /> } />
              </Route>
              <Route path='/guest/:labId/:kodeInventaris' element={ <GuestLaporan /> } />
              <Route element={ <PrivateRoute />}>
                <Route path='/dashboard' element={ <Dashboard /> } />
                <Route path='/manage' element={ <Manage /> } />
                <Route path='/manage/:labId' element={ <ManageKomputer /> } />
                <Route path='/manage/:labId/:kodeInventaris' element={ <KelolaStatusLaporan /> } />
                <Route path='/manage/:labId/:kodeInventaris/aichat' element={ <AiChat /> } />
                <Route path='/logout' element={ <Logout /> } />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

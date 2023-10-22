import React, { useState } from 'react';
import Layout from './layouts/Layout';
import LandingPage from './pages/LandingPage/LandingPage';
function App() {
  return (
    <>
      <Layout>
        <LandingPage />
      </Layout>
    </>
  );
}

export default App;

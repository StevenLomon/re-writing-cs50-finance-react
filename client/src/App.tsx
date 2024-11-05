// client/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';

const App: React.FC = ()=> {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/login' element={<Login />} />
          {/* Other routes go here */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

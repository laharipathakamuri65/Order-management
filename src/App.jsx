import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import ProductList from '../products/ProductList.jsx';
import BasicButtons from '../jsFeatures/index.jsx';
import DrawerAppBar from '../materialComponents/appBar.jsx';
import Typography from '@mui/material/Typography';

export default function App() {
  return (
    <Router>
      <DrawerAppBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/js-features" element={<BasicButtons />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/productslist" element={<ProductList />} />
        <Route path="*" element={<Typography>Welcome to the PMJ</Typography>} />
      </Routes>
    </Router>
  );
}

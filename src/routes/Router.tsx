import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cart from '../pages/Cart';
import Catalog from '../pages/Catalog';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Product from '../pages/Product';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/catalog/:slug" element={<Product />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;

import React from "react";

import { Routes, Route } from "react-router-dom";

import { Home, NftDetail, Mint } from "../pages";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nft/:id" element={<NftDetail />} />
      <Route path="/mint" element={<Mint />} />
    </Routes>
  );
};

export default Routers;

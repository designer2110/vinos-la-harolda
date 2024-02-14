import React from "react";
import ItemListContainer from "../components/ItemListContainer/ItemListContainer";
import { Home } from '../components/pages/home/Home';

function HomePage() {
  return (
    <div>
      <Home/>
      <ItemListContainer />
    </div>
  );
}

export default HomePage;

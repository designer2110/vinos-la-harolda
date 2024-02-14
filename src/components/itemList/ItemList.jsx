import React from "react";
import { useState } from "react";
import FlexWrapper from "../flexWrapper/FlexWrapper";
import Card from "../Card/Card";
import './ItemList.css';

function ItemList(props) {
  const [query, setQuery] = useState("");
  return (
    <div>
       <div class="search">
        <input type="text" placeholder="Buscar productos..." className="search1" onChange={(e) => setQuery(e.target.value)}></input>
        <i class="fa fa-search"></i>
      </div>
    <FlexWrapper>
      {props.products.filter(product=>product.title.toLowerCase().includes(query)).map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </FlexWrapper>
    </div>
  );
}

export default ItemList;

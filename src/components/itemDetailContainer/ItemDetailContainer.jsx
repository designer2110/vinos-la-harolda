import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleItem, getSingleItem2 } from "../../services/firebase";
import { cartContext } from "../../storage/cartContext";
import Button, { ButtonChild } from "../button/Button";
import ItemCount from "../itemCount/ItemCount";
import "./itemdetail.css";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ItemDetailContainer() {
  const [product, setProduct] = useState({});
  const [isInCart, setIsInCart] = useState(false);

  let { itemid } = useParams();

  const { cart, addItem } = useContext(cartContext);

  const itemInCart = cart.find((item) => item.id === product.id);

  let stockUpdated;

  if (itemInCart) stockUpdated = product.stock - itemInCart.count;
  else stockUpdated = product.stock;

  const showToast = () => {
    toast('Proceder al checkout', {
        data: {
            title: 'Hello World Again',
            text: 'We are here again with another article'
        }
    });
};

  // onAddtoCart
  function handleAddToCart(count) {
    setIsInCart(true);
    alert(`Agregaste ${count} de ${product.title} al carrito`);
    product.count = count;
    addItem(product);

    showToast();
  }

  useEffect(() => {
    if(itemid ==='2RTo5AvKVDxOXKVfmy0V' ||
      itemid ===  'KENuBafRFeXdAuKClZAV' ||
      itemid ===  'U6x1HgwJc2pAIRl2X32I' ||
      itemid ===  'XlPwwOeQSVPZt9vTgjTH' ||
      itemid ===  'bjp0NOT7g7MgGb6PT22J' ||
      itemid ===  'lOffx9APQefZKDYb2nMc' ||
      itemid ===  'nplaZDuj4MFCo9QpTP9p' ||
      itemid ===  'oUFW2JxcGlnAT1M9iygB'
      ) {
    getSingleItem(itemid)
      .then((respuesta) => {
        setProduct(respuesta);
      })
      .catch((error) => alert(`Error: ${error}`));} else {
        getSingleItem2(itemid)
      .then((respuesta) => {
        setProduct(respuesta);
      })
      .catch((error) => alert(`Error: ${error}`));
      }
  }, [itemid]);

  return (

    <div className="card-detail_main">
      <Link to="/cart">
    <ToastContainer autoClose={8000}/>
    </Link>
      <div className="card-detail_img">
        <img className="img" src={product.imgurl} alt={product.title} />
      </div>
      <div className="card-detail_detail">
        <h1>{product.title}</h1>
        <h2 className="priceTag">$ {product.price}</h2>
        <small>{product.detail}</small>
      </div>

      <ItemCount stock={stockUpdated} onAddToCart={handleAddToCart} />

      <Link to="/cart">
        <ButtonChild>Ir al carrito</ButtonChild>
      </Link>
    </div>
  );
}

export default ItemDetailContainer;

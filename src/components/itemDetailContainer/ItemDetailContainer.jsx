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
    if(itemid ==='2UUPhQBxTFiQ0c2hPxaG' ||
      itemid ===  '3SVbEhLz073v7ieKdxHF' ||
      itemid ===  '48wNx3fwydHatQKzKD2G' ||
      itemid ===  '5Jq7H2fcatrw8NjiINEm' ||
      itemid ===  '62jQ9oulwhIc7gqCLX1u' ||
      itemid ===  '8TgRbeeyP4FSUij8VEin' ||
      itemid ===  'BzujOgPlfcl7KEPQkjdx' ||
      itemid ===  'CCIiNeOodhIQUBcnEYkC' ||
      itemid ===  'GlrQOqWzhRfGwzHf8LSV' ||
      itemid ===  'T6mGibRg2nsCDpuvv3dV' ||
      itemid ===  'X1CPHNzDczvsYO1jjKGP' ||
      itemid ===  'XW644AdQNX3KVtyJODMC' ||
      itemid ===  'Zz3CkZ4v8bTnn5Mjrd5i' ||
      itemid ===  'cBii64Hin9BiyfDj0CG3' ||
      itemid ===  'fKppDpP8nRvvmpeq0R0Q' ||
      itemid ===  'h8PxJ3dLUj6IUYYMC1v5' ||
      itemid ===  'iG53Ou73jdEwtjzScz4W' ||
      itemid ===  'o26Cdx0uw629prDiZ9xY' ||
      itemid ===  'v2t6j7evWbyF7vzgG8f9' ||
      itemid ===  'zydEJ2haeCE2340S1g13'
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

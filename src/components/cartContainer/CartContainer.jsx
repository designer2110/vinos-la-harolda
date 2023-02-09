import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createBuyOrder } from "../../services/firebase";
import { cartContext } from "../../storage/cartContext";
import { ButtonChild } from "../button/Button";

import "./cart.css";
import CartForm from "./CartForm";

function CartContainer() {
  const { cart } = useContext(cartContext);
  const [orderId, setOrderId] = useState(null);
  const { getTotalPriceInCart } = useContext(cartContext);



  const navigateTo = useNavigate();

  async function handleCheckout(userData) {

    let total = 0;
    cart.forEach((item) => (total += (item.price*item.count)));

    const items = cart.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      count: product.count,
    }));
    
    //1. modelo de orden de compra
    const order = {
      buyer: userData,
      items: items,
      date: new Date(),
      total: total,
    };

    console.log(order);

    //2. Enviarla a firebase.js
    let id = await createBuyOrder(order);

    //3. redirigir al usuario
    navigateTo(`/gracias/${id}`);
  }

  
  
  if (orderId !== null)
    return (
      <div>
        <h1>Gracias por tu compra</h1>
        <p>El id de tu compra es: {orderId.toFixed(2)}</p>
      </div>
    );

  return (
    <>
      <h1>Tu Carrito</h1>

      <table className="cartList">
        <thead className="cartList_head">
          <tr className="cartList_row">
            <th>Miniatura</th>
            <th>Titulo</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Remover</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="cartList_row">
              <td>
                <img height={50} src={item.imgurl} alt={item.title} />
              </td>
              <td>{item.title}</td>
              <td>$ {item.price}</td>
              <td>{item.count}</td>
              <td>
                <ButtonChild color="#c63224" onClick={item.removeItem}>
                  X
                </ButtonChild>
              </td>
              <th>$ {item.price*item.count}</th>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="cartList_detail">
        <h4>El total de tu compra es de $ {getTotalPriceInCart()}</h4>
      </div>
      <CartForm onSubmit={handleCheckout} />
    </>
  );
}

export default CartContainer;

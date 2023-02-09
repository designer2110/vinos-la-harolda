const { createContext, useState } = require("react");

export const cartContext = createContext();

export function CartContextProvider(props) {
  let [cart, setCart] = useState([]);

  function addItem(item) {

    const isInCart = cart.some((itemInCart) => itemInCart.id === item.id);

    if (isInCart) {
      let newCart = [...cart];
      let index = cart.findIndex((itemInCart) => itemInCart.id === item.id);
      alert("el item ya está en el carrito");
    } else {
      setCart([...cart, item]);
    }
  }

  function removeItem(idToDel) {
    setCart(cart.pop());
  }

  function clearCart() {
    /* Vaciar el carrito */
  }

  function getTotalItems() {
    let total = 0;
    cart.forEach((item) => (total += item.count));
    if(total === 0)
    return "";
    else
    return total;
  }

  function getTotalPriceInCart() {
    let total = 0;
    cart.forEach((item) => (total += (item.price*item.count)));
    return total;
  }

  const value = {
    cart,
    addItem,
    getTotalItems,
    getTotalPriceInCart,
    removeItem,
  };

  return (
    <cartContext.Provider value={value}>{props.children}</cartContext.Provider>
  );
}

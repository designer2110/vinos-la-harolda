import React, { useState, useEffect } from "react";
import FlexWrapper from "../flexWrapper/FlexWrapper";

import { getItemsByCategory } from "../../services/firebase";
import { getItemsPromise, getItemsByPricePromise, getItemsByPricePromise50, getItemsPromisePg2, getItems } from "../../services/firebase";

import ItemList from "../itemList/ItemList";
import Loader from "../Loader/Loader";
import Notification from "../notification/Notification";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Zocalo from "../zocalo/zocalo";
import Footer from "../Footer/Footer";

function ItemListContainer() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [notification, setNotification] = useState({
    type: "info",
    text: "Cargando datos",
  });

  const { idcategory, idprice, pageid } = useParams();

  //con async await - try catch
  async function getProducts() {
  if (!idcategory) {
    if(pageid == 1) {
      try {
        let response = await getItemsPromise();
        setProducts(response);
        setNotification({
          type: "default",
          text: `Se cargaron ${response.length} productos correctamente...`,
        });
      } catch (error) {
        alert(error);
        setNotification({
          type: "danger",
          text: `Error cargando los productos: ${error}`,
        });
      } finally {
        setIsLoading(false);
      } } else if (pageid == 2) {
        try {
          let response = await getItemsPromisePg2();
          setProducts(response);
          setNotification({
            type: "default",
            text: `Se cargaron ${response.length} productos correctamente...`,
          });
        } catch (error) {
          alert(error);
          setNotification({
            type: "danger",
            text: `Error cargando los productos: ${error}`,
          });
        } finally {
          setIsLoading(false);
        }
      }
    // filtro por precio
    if(idprice == 100) {
      try {
        let response = await getItemsByPricePromise();
        setProducts(response);
        setNotification({
          type: "default",
          text: `Se cargaron ${response.length} productos correctamente...`,
        });
        function hide()  {  
          document.getElementById("paginas").style.visibility="hidden"; }
        hide();
      } catch (error) {
        alert(error);
        setNotification({
          type: "danger",
          text: `Error cargando los productos: ${error}`,
        });
      } finally {
        setIsLoading(false);
      } } else if (idprice == 50) {
        try {
          let response = await getItemsByPricePromise50();
          setProducts(response);
          setNotification({
            type: "default",
            text: `Se cargaron ${response.length} productos correctamente...`,
          });
          function hide()  {  
            document.getElementById("paginas").style.visibility="hidden"; }
          hide();
        } catch (error) {
          alert(error);
          setNotification({
            type: "danger",
            text: `Error cargando los productos: ${error}`,
          });
        } finally {
          setIsLoading(false);
        }
      }

    } else {
      let response = await getItemsByCategory(idcategory);
      setProducts(response);
      setIsLoading(false);
      setNotification({
        type: "default",
        text: `Se cargaron ${response.length} productos correctamente...`,
      });
      function hide()  {  
        document.getElementById("paginas").style.visibility="hidden"; }
      hide();
    }
  }

  useEffect(() => {
    getProducts();
  }, [idcategory, pageid, idprice]);

  return (
    <FlexWrapper column>
      {notification.type && <Notification notification={notification} />}

      {isLoading ? (
        <FlexWrapper>
          {/* <Loader color="blue" size={500} /> */}
        </FlexWrapper>
      ) : (
        <ItemList products={products} />
      )}
    <Zocalo/>
    <Footer/>
    </FlexWrapper>

  );
}

export default ItemListContainer;

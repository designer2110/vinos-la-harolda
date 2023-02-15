import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/Navbar/Navbar';
// import Card from './components/Card/CardUI';
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";

import ItemDetailContainer from "./components/itemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { CartContextProvider } from "./storage/cartContext";
import CartContainer from "./components/cartContainer/CartContainer";
import OrderDetails from "./components/orderDetails/OrderDetails";
import { exportData, exportDataWithBatch, exportDataWithBatch2 } from "./services/firebase";
import ItemListContainerByPrice from "./components/ItemListContainer/ItemListContainer";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  function handleLogin(username) {
    alert(`${username} Iniciaste sesión`);
  }
  return (
    <div className="App">
     <CartContextProvider>
        <BrowserRouter>
          <NavbarComp onLogin={handleLogin} />
          <Routes>
            /* <Route path="/" element={<Navigate to='/page/1' />} /> */
            <Route path="/page/:pageid" element={<HomePage />} />
            <Route path="/category/:idcategory" element={<ItemListContainer />} />

            <Route path="/item/:itemid" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<CartContainer />} />

            <Route path="/contacto" element={<h1>Contacto</h1>} />
            <Route path="/gracias/:orderid" element={<OrderDetails />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/byPrice/:idprice" element={<ItemListContainer/>} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;



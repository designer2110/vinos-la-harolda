import React, { Component } from 'react'
import './Navbar.css'
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { cartContext } from "../../storage/cartContext";
import { useContext } from "react";
import UserMenu from "./UserMenu";
import logo from "../../assets/img/logo.png";
import cart from "../../assets/img/icons8-cart.png";

function NavbarComp ({onLogin}) {
  function handleSubmit(evt) {
    evt.preventDefault();
    let username = evt.target.elements[0].value;
    onLogin(username);
  }

  const { getTotalItems } = useContext(cartContext);
      
    return (
      <div>
         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link to="/page/1" className='a'>
        <Navbar.Brand className='NavbarBrand'>Lala shop</Navbar.Brand>
          <img className="logo" src={logo}></img>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Link className="nav-link" to="/category/men's clothing">
            <a>Ropa de hombre</a>
          </Link>
          <Link className="nav-link" to="/category/women's clothing">
            <a>Ropa de mujer</a>
          </Link>
          <Link className="nav-link" to="/category/jewelery">
          <a>Joyería</a>
          </Link>
          <Link className="nav-link" to="/category/electronics">
          <a>Electrónica</a>
          </Link>
          <form onSubmit={handleSubmit} className="form">
          <label>
            Ingresa tu nombre:
            <input name="username" placeholder="username" />
          </label>
          <button type="submit">Login</button>
        </form>
          </Nav>
          <Nav>
          <Link to="/cart" className='a'>
          <span className="nav-item"><img className="cart" src={cart}></img>{getTotalItems()}</span>
          </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
    )
  }

  export default NavbarComp;
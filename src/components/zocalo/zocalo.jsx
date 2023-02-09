import React, { Component } from 'react'
import './zocalo.css'
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { cartContext } from "../../storage/cartContext";
import { useContext } from "react";

function Zocalo () {

  const { getTotalItems } = useContext(cartContext);
      
    return (
      <div>
         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <a>Filter by price:</a>
          <Link to="/byPrice/100">
            Less than 100
          </Link>
          <Link to="/byPrice/50">
            Less than 50
          </Link>
          
          </Nav>
          <Nav id="paginas">
          <li className="nav-item">
          Páginas: 
        </li>
      <Link to="/page/1">
        <li className="nav-item">
          1
        </li>
      </Link>
      <li className="nav-item">,</li>
      <Link to="/page/2">
        <li className="nav-item">
          2
        </li>
      </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
    )
  }

  export default Zocalo;

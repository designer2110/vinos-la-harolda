import React from "react";
import { Link } from "react-router-dom";
import './card-style.css'
import { ButtonChild } from "../button/Button";

function Card({ id, title, price, description, imgurl, discount }) {
  const urlDetail = `/item/${id}`;

  let priceClassNames = `font-xl ${discount ? "price-discount" : ""}`;
  return (
    <Link to={urlDetail}>
    <div className='card text-center shadow'>
      <div className='overflow'>
        <img 
          src={imgurl}
          className='card-img-top'
          alt=""
        />
      </div>
      <div className="card-body text-dark">
      <h4 className={priceClassNames}>$ {price}</h4>
        <h4 className="card-title">{title.split(' ').slice(0, 5).join(' ')}</h4>
        <p className="card-text text-secondary">
          {description.split(' ').slice(0, 5).join(' ')}
        </p>
        <ButtonChild className="btn byn-outline">Ver más</ButtonChild>
      </div>
    </div>
    </Link>
  );
};

export default Card;

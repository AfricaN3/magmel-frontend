import React from "react";

import "./nft-card.css";

const NftCard = ({ image, alt }) => {
  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={image} alt={alt} className="w-100" />
      </div>
    </div>
  );
};

export default NftCard;

import React, { useState, useEffect } from "react";

import axios from "axios";

import { convertBytestringtoNumber, truncate } from "../../utils";

import nftImage from "../../assets/images/ainft.jpeg";

import "./nftcard.css";

const NftCard = ({ name, nftId, description, image }) => {
  const [renderedImage, setRenderedImage] = useState(nftImage);
  useEffect(() => {
    const getImageFromIpfs = async () => {
      try {
        const tokenURI = image.slice(7);
        const ipfsImageUrl = `https://ipfs.io/ipfs/${tokenURI}`;
        const ipfsResponse = await axios.get(`${ipfsImageUrl}`);
        const data = ipfsResponse.data;

        setRenderedImage(data);
      } catch (error) {
        console.log(error);
      }
    };

    getImageFromIpfs();
  }, [image]);

  return (
    <div className="item">
      <h5>
        {truncate(name, 7)}{" "}
        <span className="nft-id">
          {String(convertBytestringtoNumber(nftId)).padStart(2, "0")}
        </span>
      </h5>
      <img src={renderedImage} alt={description} />
      <p>{truncate(description, 40)}</p>
    </div>
  );
};

export default NftCard;

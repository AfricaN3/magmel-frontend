import { useState } from "react";

import Carousel from "react-multi-carousel";

import "./mints.css";

import dragonImage from "../../assets/images/dragon.png";
import NftCard from "./NftCard";
import useReadNeo from "../../hooks/useReadNeo";

const Mints = () => {
  const { magmelNfts, myNfts } = useReadNeo();
  const [seeMyNfts, setSeeMyNfts] = useState(false);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="mints" id="collection">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <button
              className="see-nfts"
              onClick={() => {
                setSeeMyNfts((value) => !value);
              }}
            >
              {seeMyNfts ? `See Collection` : `View your NFTs`}
            </button>
            {!seeMyNfts ? (
              <div className="mints-bx wow zoomIn">
                <h2>{`Featured NFTs`}</h2>
                <p>
                  {`A curated selection of the most recent NFTs from the collection.`}
                  <br></br> Please share your own collections on Twitter using
                  #MAGMEL
                </p>
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  className="owl-carousel owl-theme mints-slider"
                >
                  {magmelNfts?.map((nft) => (
                    <NftCard
                      key={nft.id}
                      name={nft.name}
                      nftId={nft.id}
                      description={nft.description}
                      image={nft.image}
                    />
                  ))}
                </Carousel>
              </div>
            ) : myNfts?.length > 0 ? (
              <div className="mints-bx wow zoomIn">
                <h2>{`My NFTs`}</h2>
                <p>
                  {`A curated selection of your mints from the Magpie Melanges collection`}
                  <br></br> Please share your NFTs on Twitter using #MAGMEL
                </p>
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  className="owl-carousel owl-theme mints-slider"
                >
                  {myNfts?.map((nft) => (
                    <NftCard
                      key={nft.id}
                      name={nft.name}
                      nftId={nft.id}
                      description={nft.description}
                      image={nft.image}
                    />
                  ))}
                </Carousel>
              </div>
            ) : (
              <div className="mints-bx wow zoomIn">
                <h2>{`My NFTs`}</h2>
                <p>
                  {`A curated selection of the most recent NFTs from the collection.`}
                  <br></br> <span className="no-nft">You have no #MAGMEL</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <img
        className="background-image-left"
        src={dragonImage}
        alt="background"
      />
    </section>
  );
};

export default Mints;

import { Container, Row, Col } from "react-bootstrap";
import heroImg from "../../assets/images/hero.png";
import { ArrowRightCircle } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
// import "animate.css";
import TrackVisibility from "react-on-screen";

import TypingComponent from "./Typing";

import "./hero.css";

const Hero = () => {
  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <span className="tagline">Magpie's Melange</span>
                  <h1>
                    <span className="txt-rotate">
                      <span className="wrap">
                        <TypingComponent className="wrap" />
                      </span>{" "}
                    </span>
                  </h1>
                  <p>
                    Unleash the Power of AI and Own a Piece of Digital Art
                    History with Magpie's Melange NFTs
                  </p>
                  <Link to="/mint">
                    <button>
                      Mint Your NFT <ArrowRightCircle size={25} />
                    </button>
                  </Link>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  <img src={heroImg} alt="Magpie's Melange" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;

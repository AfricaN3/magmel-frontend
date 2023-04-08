import { Container, Row, Col } from "react-bootstrap";

import "./footer.css";

import logo from "../../assets/images/whitelogo.png";
import navIcon1 from "../../assets/images/nav-icon1.svg";
import navIcon3 from "../../assets/images/nav-icon3.svg";
import navIcon4 from "../../assets/images/nav-icon4.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon mt-5">
              <a
                href="https://twitter.com/Africa_N3?t=_5zJpCZUotnMAhzYWbj7uw&s=08"
                target="_blank"
                rel="noreferrer"
              >
                <img src={navIcon1} alt="Icon" />
              </a>
              <a
                href="https://discord.gg/aEHWMdyeCB"
                target="_blank"
                rel="noreferrer"
              >
                <img src={navIcon4} alt="discord" />
              </a>
              <a href="https://t.me/african3" target="_blank" rel="noreferrer">
                <img src={navIcon3} alt="Icon" />
              </a>
            </div>
            <p>Copyright 2022. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

import { useState, useEffect } from "react";

import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import ButtonConnect from "../header/ButtonConnect";

import "./header.css";

import logo from "../../assets/images/whitelogo.png";
import navIcon1 from "../../assets/images/nav-icon1.svg";
import navIcon4 from "../../assets/images/nav-icon4.svg";

const NAV__LINKS = [
  {
    display: "Home",
    url: "/",
  },
  {
    display: "Mint",
    url: "/mint",
  },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
      <Container>
        <NavLink to={`/`} className="navbar-brand">
          <img src={logo} alt="Logo" />
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {NAV__LINKS.map((item, index) => (
              <NavLink
                to={item.url}
                caseSensitive
                key={index}
                className={(navClass) =>
                  navClass.isActive
                    ? "active nav-link navbar-link"
                    : "nav-link navbar-link"
                }
              >
                {item.display}
              </NavLink>
            ))}
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a
                href="https://twitter.com/Africa_N3?t=_5zJpCZUotnMAhzYWbj7uw&s=08"
                target="_blank"
                rel="noreferrer"
              >
                <img src={navIcon1} alt="twitter" />
              </a>
              <a
                href="https://discord.gg/aEHWMdyeCB"
                target="_blank"
                rel="noreferrer"
              >
                <img src={navIcon4} alt="discord" />
              </a>
            </div>
            <ButtonConnect />
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

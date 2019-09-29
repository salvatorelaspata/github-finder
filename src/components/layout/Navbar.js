import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
const Navbar = ({ icon, title }) => {
  return (
    <nav className='navbar bg-primary'>
      <FontAwesomeIcon icon={icon} pulse={true} />
      <h1>{title}</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Coffee Finder",
  icon: ["fas", "coffee"]
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.array.isRequired
};

export default Navbar;

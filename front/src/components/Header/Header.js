import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import react from 'react.svg';
import './Header.css';

const Header = ({ categories = [] }) => {
  return (
    <header className="app__header">
      <Link to="/" className="app__logo">
        <img src={react} alt="none" /> Readable
      </Link>
      <nav className="app__nav">
        <ul className="list-unstyled">
          <li className="nav__item nav__item--new-post">
            <NavLink to="/posts/new" className="nav__link">
              + Post
            </NavLink>
          </li>
          {categories.map((category, i) => (
            <li key={i} className="nav__item nav__item--sections">
              <NavLink to={`/${category.path}`} className="nav__link">
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

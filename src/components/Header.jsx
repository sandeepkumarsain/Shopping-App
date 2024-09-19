import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { ecomContext } from "../Home";

function Header() {
  const { cart } = useContext(ecomContext);

  return (
    <header>
      <h2>
        <Link to="/">Shopping App</Link>
      </h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <div className="cartIconParent">
            <MdShoppingCart className="cartIcon" />
            {<span>{cart.length}</span>}
          </div>
        </li>
      </ul>
    </header>
  );
}

export default Header;

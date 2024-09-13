import { useContext } from "react";
import { ecomContext } from "../Home";

function Cart() {
  const { cart } = useContext(ecomContext);

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.map((product, index) => (
          <li key={index}>
            <img
              src={product.attributes.image}
              alt={product.attributes.title}
            />
            <h2>{product.attributes.title}</h2>
            <p>Price: {product.attributes.price}</p>
            <p>Description: {product.attributes.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
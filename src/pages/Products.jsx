import { useContext } from "react";
import { ecomContext } from "../Home";

function Products() {
  const { products, cart, setCart, loading } = useContext(ecomContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div>
      <h1>All Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img
              src={product.attributes.image}
              alt={product.attributes.title}
            />
            <h2>{product.attributes.title}</h2>
            <p>Price: {product.attributes.price}</p>
            <p>Description: {product.attributes.description}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
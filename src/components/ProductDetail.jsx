import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ecomContext } from "../Home";

function ProductDetail() {
  const { id } = useParams();
  const { products, cart, setCart } = useContext(ecomContext);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const addToCart = () => {
    setCart([...cart, product]);
  };

  return (
    <div className="productDetail">
      <div className="detailLeft">
        <img src={product.attributes.image} alt={product.attributes.title} />
      </div>
      <div className="detailRight">
        <h1>{product.attributes.title}</h1>
        <h3>{product.attributes.company}</h3>
        <p>Price: {product.attributes.price}</p>
        <p>Description: {product.attributes.description}</p>
        <button onClick={addToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ProductDetail;

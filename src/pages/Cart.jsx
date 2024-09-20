import { useContext, useState, useEffect } from "react";
import { ecomContext } from "../Home";

function Cart() {
  const { cart, handleRemoveFromCart } = useContext(ecomContext);

  // Initialize the state for quantities
  // const [quantities, setQuantities] = useState(
  //   cart.reduce((acc, product) => {
  //     acc[product.id] = product.quantity || 1;
  //     return acc;
  //   }, {})
  // );/


  // function CartComponent({ cart }) {
    // Initialize state for quantities
    const initialQuantities = {};
    
    // Populate initialQuantities with the cart product ids and their respective quantities
    cart.forEach((product) => {
      initialQuantities[product.id] = product.quantity || 1;
    });
  
    const [quantities, setQuantities] = useState(initialQuantities);

  const [subtotal, setSubtotal] = useState(0);
  const shippingCost = 10; // Flat shipping cost
  const taxRate = 0.08;    // 8% tax rate

  // Increment the quantity of a product
  // function handleInc(productId) {
  //   setQuantities((prevQuantities) => ({
  //     ...prevQuantities,
  //     [productId]: prevQuantities[productId] + 1,
  //   }));
  // }

  function handleInc(productId) {
    // Create a shallow copy of the previous quantities object
    const newQuantities = { ...quantities };
  
    // Increment the quantity of the specific product
    newQuantities[productId] = newQuantities[productId] + 1;
  
    // Update the state with the new quantities
    setQuantities(newQuantities);
  }
  

  // Decrement the quantity of a product
  // function handleDec(productId) {
  //   setQuantities((prevQuantities) => ({
  //     ...prevQuantities,
  //     [productId]: Math.max(prevQuantities[productId] - 1, 1),
  //   }));
  // }

  function handleDec(productId) {
    // Create a copy of the current quantities object
    const newQuantities = {};
    for (const id in quantities) {
      newQuantities[id] = quantities[id]; // Copy each quantity
    }
  
    // Check if the quantity is greater than 1
    if (newQuantities[productId] > 1) {
      newQuantities[productId]--; // Decrease the quantity
    }
  
    setQuantities(newQuantities); // Update the state
  }
  

  // Calculate Subtotal whenever the cart or quantities change
  // useEffect(() => {
  //   const newSubtotal = cart.reduce((acc, product) => {
  //     const price = Number(product.attributes.price) || 0;  // Ensure price is a number
  //     return acc + price * quantities[product.id];
  //   }, 0);
  //   setSubtotal(newSubtotal);
  // }, [cart, quantities]);

  useEffect(() => {
    let newSubtotal = 0;
    for (let i = 0; i < cart.length; i++) {
      const product = cart[i];
      const price = Number(product.attributes.price) || 0;  // Ensure price is a number
      newSubtotal += price * quantities[product.id];  // Multiply price by quantity
    }
    setSubtotal(newSubtotal);
  }, [cart, quantities]);
  

  const taxAmount = subtotal * taxRate;
  const orderTotal = subtotal + shippingCost + taxAmount;

  return (
    <>
      <h1>Shopping Cart</h1>
      <div className="cartMain">
        <div className="cartProductDetail">
          {cart.map((product, index) => (
            <div key={index}>
              <div className="cartDetailLeft">
                <img
                  src={product.attributes.image}
                  alt={product.attributes.title}
                />
              </div>
              <div className="cartDetailRight">
                <h2>{product.attributes.title}</h2>
                <p>Price: ${Number(product.attributes.price).toFixed(2)}</p> {/* Ensure price is a number */}
                <div className="buttons">
                  <div className="counterButton">
                    <button onClick={() => handleInc(product.id)}>+</button>
                    <p className="Quantity">{quantities[product.id]}</p>
                    <button onClick={() => handleDec(product.id)}>-</button>
                  </div>
                  <button
                    className="removeButton"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="totalAmount">
          <p>Subtotal: ${subtotal.toFixed(2)}</p>
          <p>Shipping: ${shippingCost.toFixed(2)}</p>
          <p>Tax: ${taxAmount.toFixed(2)}</p>
          <h3>Order Total: ${orderTotal.toFixed(2)}</h3>
          <button>Please LOGIN</button>
        </div>
      </div>
    </>
  );
}

export default Cart;

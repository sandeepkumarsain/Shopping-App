import { useContext, useEffect, useState } from "react";
import { ecomContext } from "../Home";
import { Link } from "react-router-dom";

function Products() {
  const { products, loading } = useContext(ecomContext);
  const [filteredCategoryProducts, setFilteredCategoryProducts] = useState([]);
  const selectOptions = [
    {
      name: "All",
      label: "All",
      value: "All",
    },
    {
      name: "Chairs",
      label: "Chairs",
      value: "Chairs",
    },
    {
      name: "Tables",
      label: "Tables",
      value: "Tables",
    },
    {
      name: "Kids",
      label: "Kids",
      value: "Kids",
    },
    {
      name: "Sofas",
      label: "Sofas",
      value: "Sofas",
    },
    {
      name: "Beds",
      label: "Beds",
      value: "Beds",
    },
  ];

  const selectCompany = [
    {
      name: "All",
      label: "All",
      value: "All",
    },
    {
      name: "Modenza",
      label: "Modenza",
      value: "Modenza",
    },
    {
      name: "Luxora",
      label: "Luxora",
      value: "Luxora",
    },
    {
      name: "Artifex",
      label: "Artifex",
      value: "Artifex",
    },
    {
      name: "Comfora",
      label: "Comfora",
      value: "Comfora",
    },
    {
      name: "Homestead",
      label: "Homestead",
      value: "Homestead",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }
  // function handleChangeCategory(e) {
  //  if(selectedCategory === "All"){
  //   setFilteredCategoryProducts(products);
  //  }else{
  //   console.log(e.target.value, "select");
  //   const filteredCategoryProducts = products.filter((product) => {
  //     return product.attributes.category == e.target.value;
  //   });
  //   console.log(filteredCategoryProducts, "select filteredCategoryProducts");
  //   setFilteredCategoryProducts(filteredCategoryProducts);
  //  }
  // }
  function handleChangeCategory(e) {
    const selectedCategory = e.target.value; 
    
    if (selectedCategory && "All") {
      setFilteredCategoryProducts(products);
    } else {
      console.log(selectedCategory, "selected category");
      
      const filteredCategoryProducts = products.filter((product) => {
        return product.attributes.category === selectedCategory;
      });
      
      console.log(filteredCategoryProducts, "filteredCategoryProducts");
      setFilteredCategoryProducts(filteredCategoryProducts);
    }
  }
  
  function handleChangeCompany(e){
    console.log(e.target.value, "select");
    const filteredCategoryProducts = products.filter((product) => {
      return product.attributes.company == e.target.value;
    });
    console.log(filteredCategoryProducts, "select filteredCategoryProducts");
    setFilteredCategoryProducts(filteredCategoryProducts);
  }

  return (
    <>
      <h1>All Products</h1>
      <div className="productsMain">
        <div className="search">
          <form id="myForm">
            <label htmlFor="input">Search Products</label> <br />
            <input type="text" id="input" />
            <br />
            <label htmlFor="select1">Search Category</label>
            <br />
            <select
              id="select1"
              onChange={(e) => handleChangeCategory(e)}
              name="select1"
            >
              {selectOptions.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <br />
            <label htmlFor="select2">Select Company</label>
            <br />
            <select
              id="select2"
              onChange={(e) => handleChangeCompany(e)}
              name="select2"
            >
              {selectCompany.map((item, index) => {
                return (
                  <option key={index} value={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <br />
            
            
            <button type="button">ClearFilter</button>
          </form>
        </div>
        <div className="products">
          {filteredCategoryProducts.map((product) => (
            <div className="allproduct" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.attributes.image}
                  alt={product.attributes.title}
                />
                <h2>{product.attributes.title}</h2>
                <p>Price: {product.attributes.price}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;

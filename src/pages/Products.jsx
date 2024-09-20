import { useContext, useEffect, useState } from "react";
import { ecomContext } from "../Home";
import { Link } from "react-router-dom";

function Products() {
  const { products, loading } = useContext(ecomContext);
  const [filteredCategoryProducts, setFilteredCategoryProducts] =
    useState(products);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const selectOptions = [
    { name: "All", label: "All", value: "All" },
    { name: "Chairs", label: "Chairs", value: "Chairs" },
    { name: "Tables", label: "Tables", value: "Tables" },
    { name: "Kids", label: "Kids", value: "Kids" },
    { name: "Sofas", label: "Sofas", value: "Sofas" },
    { name: "Beds", label: "Beds", value: "Beds" },
  ];

  const selectCompany = [
    { name: "All", label: "All", value: "All" },
    { name: "Modenza", label: "Modenza", value: "Modenza" },
    { name: "Luxora", label: "Luxora", value: "Luxora" },
    { name: "Artifex", label: "Artifex", value: "Artifex" },
    { name: "Comfora", label: "Comfora", value: "Comfora" },
    { name: "Homestead", label: "Homestead", value: "Homestead" },
  ];

  useEffect(() => {
    filterProducts(selectedCategory, selectedCompany, searchTerm);
  }, [products, selectedCategory, selectedCompany, searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }

  function handleChangeCategory(e) {
    const category = e.target.value;
    setSelectedCategory(category);
  }

  function handleChangeCompany(e) {
    const company = e.target.value;
    setSelectedCompany(company);
  }

  function handleSearchChange(e) {
    const search = e.target.value;
    setSearchTerm(search);
  }

  function filterProducts(category, company, search) {
    let filtered = products;

    if (category !== "All") {
      filtered = filtered.filter(
        (product) => product.attributes.category === category
      );
    }

    if (company !== "All") {
      filtered = filtered.filter(
        (product) => product.attributes.company === company
      );
    }

    if (search) {
      filtered = filtered.filter((product) =>
        product.attributes.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredCategoryProducts(filtered);
  }

  function handleClearFilters() {
    setSelectedCategory("All");
    setSelectedCompany("All");
    setSearchTerm("");
    setFilteredCategoryProducts(products);
  }

  return (
    <>
      <h1>All Products</h1>
      <div className="productsMain">
        <div className="search">
          <form id="myForm">
            <label htmlFor="input">Search Products</label> <br />
            <input
              type="text"
              id="input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <br />
            <label htmlFor="select1">Search Category</label>
            <br />
            <select
              id="select1"
              value={selectedCategory}
              onChange={handleChangeCategory}
              name="select1"
            >
              {selectOptions.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="select2">Select Company</label>
            <br />
            <select
              id="select2"
              value={selectedCompany}
              onChange={handleChangeCompany}
              name="select2"
            >
              {selectCompany.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
            <br />
            <button type="button" onClick={handleClearFilters}>
              Clear Filters
            </button>
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

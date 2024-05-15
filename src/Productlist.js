import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]); // Initialize as an array
  const [filteredProducts, setFilteredProducts] = useState([]); // Also initialize as an array

  useEffect(() => {
    // Replace 'your-api-endpoint' with the actual URL
    fetch('your-api-endpoint')
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data.data)) { // Ensure data.data is an array
          const productList = data.data.map(item => ({
            P_Id: item.P_Id,
            Cat_Id: item.Cat_Id,
            P_Name: item.P_Name,
            Desc: item.Desc,
            Quantity: item.Quantity,
            inStock: item.inStock,
            Price: item.Price,
            P_Thumbnail: item.P_Thumbnail
          }));
          setProducts(productList);
          setFilteredProducts(productList); // Initialize filteredProducts with the same list initially
        } else {
          console.error('Data format is incorrect');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="product-list">
      {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
        filteredProducts.map(product => (
          <div key={product.P_Id} className="product-item">
            <img src={product.P_Thumbnail} alt={product.P_Name} />
            <h3>{product.P_Name}</h3>
            <p>{product.Desc}</p>
            <p>Price: ₹{product.Price}</p>
            <p>Quantity: {product.Quantity}</p>
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductList;

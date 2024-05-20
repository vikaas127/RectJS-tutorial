import React, { useEffect, useState } from 'react';
import axios from 'axios';

/*function Category(cat_id) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3001/api/Categorylist', {
            headers: { 'Content-Type': 'application/json' },
            params: { cat_id } // Send CatId as a query parameter
        })
        .then(response => {
            if (response && Array.isArray(response.data.data)) {
              const catList = response.data.data.map(item => ({
                    Cat_Id: item.Cat_Id,
                    Cat_Name: item.Cat_Name,
                    Cat_Image: item.Cat_Image
              }));      
             console.log("API response:", catList) 
             resolve(catList); // Resolve the promise with catList 
            } else {
                console.error("Response data is not an array:", response.data);
                reject("Response data is not an array");
            }
        })
        .catch(error => {
            console.error('Error fetching product data:', error);
            reject(error); // Reject the promise with the error
        });
    });
}

export default Category ;*/

const ProductList = ({ category }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.post(`http://localhost:3001/api/productlist`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };

        if (category) {
            fetchProducts();
        }
    }, [category]);

    if (!category) {
        return <div>Please select a category.</div>;
    }

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {products.map(product => (
                <div key={product.id} style={{ margin: '10px' }}>
                    <img src={product.image} alt={product.name} style={{ width: '150px', height: '150px' }} />
                    <h3>{product.name}</h3>
                    <p>Price: ₹{product.price}</p>
                    <p>inStock: {product.inStock ? 'Available' : 'Out of Stock'}</p>
                    <button>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
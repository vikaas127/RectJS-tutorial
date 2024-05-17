import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import './home.css'; // Import the CSS file
import './CategoryList.css';
import CategoryList from './CategoryList';

function productListAPiCall(CatId) {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3001/api/productlist', {
            headers: { 'Content-Type': 'application/json' },
            params: { CatId } // Send CatId as a query parameter
        })
        .then(response => {
            if (response && Array.isArray(response.data.data)) {
                const productList = response.data.data.map(item => ({
                    P_Id: item.P_Id,
                    Cat_Id: item.Cat_Id,
                    P_Name: item.P_Name,
                    Desc: item.Desc,
                    Quantity: item.Quantity,
                    inStock: item.inStock,
                    Price: item.Price,
                    P_Thumbnail: item.P_Thumbnail
                }));
                console.log("Product List from API:", productList);
                resolve(productList); // Resolve the promise with productList
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


export default  productListAPiCall;
  

import React from 'react';
import axios from 'axios';
import productListAPiCall from './API';
import setProducts from './home';
function CategoryList() {
  // Dummy category data for demonstration
  const categories = [
    { id: 1, name: 'Mobiles', image: 'https://m.media-amazon.com/images/I/41oNiB-kLuL._SX300_SY300_QL70_FMwebp_.jpg' },
    { id: 2, name: 'Laptops', image: 'https://m.media-amazon.com/images/I/61Pb4vDP8VL._SL1080_.jpg' },
    { id: 3, name: 'Shoes', image: 'https://m.media-amazon.com/images/I/71cflgAolqL._SY695_.jpg' },
    { id: 4, name: 'Accessories', image: 'https://m.media-amazon.com/images/I/61u8rhjUajL._SL1500_.jpg' },
    { id: 5, name: 'Fashion', image: 'https://m.media-amazon.com/images/I/81MxL9rNYFL._SY741_.jpg' },
    { id: 6, name: 'Gym Accessories', image: 'https://m.media-amazon.com/images/I/717dvlgloJL._SL1500_.jpg' },
    { id: 7, name: 'Kitchen Appliances', image: 'https://m.media-amazon.com/images/I/51j-hzjxEEL._SL1080_.jpg' },
    { id: 8, name: 'Toys', image: 'https://m.media-amazon.com/images/I/8160QjpuoOL._SL1500_.jpg' },
    { id: 9, name: 'Home Decor', image: 'https://m.media-amazon.com/images/I/71vBYh7o5lL._SL1500_.jpg' },
    { id: 10, name: 'Perfumes', image: 'https://m.media-amazon.com/images/I/61Jb5S5MlYL._SL1080_.jpg' }
    // Add more categories as needed
  ];
  
  const CatList = async (event, Cat_Id) => {
    event.preventDefault();
    console.log('Category ID:', Cat_Id);

    try {
      const response = await productListAPiCall(Cat_Id);
      setProducts(response); // Use setProducts from home.js
    } catch (error) {
      console.error('Error fetching product list:', error);
    }
  };

  return (
    <div className="category-list">
            {categories.map(category => (
                <div 
                    key={category.id} 
                    className="category-item" 
                    onClick={(event) => CatList(event, category.id)} 
                    style={{ cursor: 'pointer' }} 
                >
                    <img 
                        src={category.image} 
                        alt={category.name} 
                        style={{ cursor: 'pointer' }} 
                    />
                    <span>{category.name}</span>
                </div>
            ))}
        </div>
  );
}

export default CategoryList;

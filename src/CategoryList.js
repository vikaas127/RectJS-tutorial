import React, { useEffect, useState } from 'react';
import axios from 'axios';

/* function CategoryList() {
  
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

  return (
    <div className="category-list">
            {categories.map(category => (
                <div 
                    key={category.id} 
                    className="category-item" 
                    onClick={(event) => (event, category.id)} 
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


export default CategoryList;*/
const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
      const fetchCategories = async () => {
          try {
              const response = await axios.get('http://localhost:3001/api/Categorylist');
          //    console.log(response); 
              console.log(response.data);
             
                 if (response && Array.isArray(response.data.data)) {
              const catList = response.data.data.map(item => ({
                    Cat_Id: item.Cat_Id,
                    Cat_Name: item.Cat_Name,
                    Cat_Image: item.Cat_Image
              })); 
                  setCategories(catList); 
              } else {
                console.error("Expected an array but got:", response.data);
                setCategories([]); // Set to empty array if the data is not an array
              }
            } catch (error) {
              console.error("Error fetching categories", error);
              setCategories([]); // Set to empty array in case of error
            }
          };

      fetchCategories();
  }, []);

  if (!Array.isArray(categories)) {
    console.error("Categories state is not an array:", categories);
    return <div>Error: Categories is not an array</div>;
  }

  function onSelectCategory(category) {
    // Add your logic to handle adding the product to the cart
    // This might include updating state, making an API call, etc.
    console.log(category);
  }
  

  return (
      <div style={{ display: 'inline-block', justifyContent: 'center' }}>
          {categories.map(category => (
              <div key={category.Cat_Id} className="categories"
              onClick={() => onSelectCategory(category.Cat_Name)} style={{ margin: '10px', cursor: 'pointer' }}>
                  <img 
                        src={category.Cat_Image} 
                        alt={category.Cat_Name} 
                        style={{ cursor: 'pointer' }} 
                    />
                  <span>{category.Cat_Name} </span>
              </div>
          ))}
      </div>
  );
};

export default CategoryList;

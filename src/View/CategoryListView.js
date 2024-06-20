// CategoryList.js
import React, { useEffect, useState } from 'react';
import CategoryController from '../Controller/CategoryController';

const CategoryListView = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const catList = await CategoryController.getCategories();
      console.log("catList",catList);
      setCategories(catList);
    };

    fetchCategories();
  }, []);

  if (!Array.isArray(categories)) {
    console.error("Categories state is not an array:", categories);
    return <div>Error: Categories is not an array</div>;
  }

  return (
    <div style={{ display: 'inline-block', justifyContent: 'center' }}>
      {categories.map(category => (
        <div key={category.Cat_Id} className="categories"
          onClick={() => onSelectCategory(category.Cat_Id)} style={{ margin: '10px', cursor: 'pointer' }}>
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

export default CategoryListView;

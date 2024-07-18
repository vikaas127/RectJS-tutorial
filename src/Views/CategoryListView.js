// CategoryList.js
import React, { useState } from "react";

const CategoryListView = ({ categories, handleCategory }) => {

  const handleCategoryClick = (category) => {
    console.log("Category click before triggering handleCategory:", category);
    if(category){
      console.log("Category click after triggering handleCategory:", category);
      handleCategory(category);
    } else {
      console.log("handleSearch function is not defined");
    }
  };

  return (
    <div style={{ display: 'inline-block', justifyContent: 'center' }}>
      {categories.map(category => (
        <div key={category.Cat_Id} className="categories" onClick={()=>handleCategoryClick(category.Cat_Id)}
          style={{ margin: '10px', cursor: 'pointer' }}>
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

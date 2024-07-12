// CategoryList.js
import React from 'react';

const CategoryListView = ({ categories, onCategoryClick }) => {

  return (
    <div style={{ display: 'inline-block', justifyContent: 'center' }}>
      {categories.map(category => (
        <div key={category.Cat_Id} className="categories" onClick={()=>onCategoryClick(category.Cat_Id)}
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

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CategoryList = ({ onSelectCategory }) => {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//       const fetchCategories = async () => {
//           try {
//               const response = await axios.get('http://localhost:3001/api/Categorylist');
//           //    console.log(response); 
//               console.log(response.data);
             
//                  if (response && Array.isArray(response.data.data)) {
//               const catList = response.data.data.map(item => ({
//                     Cat_Id: item.Cat_Id,
//                     Cat_Name: item.Cat_Name,
//                     Cat_Image: item.Cat_Image
//               })); 
//                   setCategories(catList); 
//               } else {
//                 console.error("Expected an array but got:", response.data);
//                 setCategories([]); // Set to empty array if the data is not an array
//               }
//             } catch (error) {
//               console.error("Error fetching categories", error);
//               setCategories([]); // Set to empty array in case of error
//             }
//           };

//       fetchCategories();
//   }, []);

//   if (!Array.isArray(categories)) {
//     console.error("Categories state is not an array:", categories);
//     return <div>Error: Categories is not an array</div>;
//   }

//   return (
//       <div style={{ display: 'inline-block', justifyContent: 'center' }}>
//           {categories.map(category => (
//               <div key={category.Cat_Id} className="categories"
//               onClick={() => onSelectCategory(category.Cat_Id)} style={{ margin: '10px', cursor: 'pointer' }}>
//                   <img 
//                         src={category.Cat_Image} 
//                         alt={category.Cat_Name} 
//                         style={{ cursor: 'pointer' }} 
//                     />
//                   <span>{category.Cat_Name} </span>
//               </div>
//           ))}
//       </div>
//   );
// };

// export default CategoryList;

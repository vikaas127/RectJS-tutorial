import axios from 'axios';

class ProductModel {
    
    static async fetchProductList(category, searchTerm) {
        console.log("Category:", category, "Search Term:", searchTerm);
        const Cat_Id = category ;
        const P_Name = searchTerm;
        
        try {
            const response = await axios.post('http://localhost:3001/api/productlist', {
                Cat_Id, P_Name
            }, {
                headers: { 'Content-Type': 'application/json' }
            });

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
                console.log("P_Name check from Product: ", P_Name);
                console.log("Cat_Id check from Product: ", Cat_Id);
                console.log("Product List from API:", productList);
                return productList;
            } else {
                console.error("Response data is not an array:", response.data);
                throw new Error("Response data is not an array");
            }
        } catch (error) {
            console.error('Error fetching product data:', error);
            throw error;
        }
    }
}

export default ProductModel;

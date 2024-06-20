// ProductModel.js
class ProductDetailsModel {
  constructor({ P_Id, P_Name, P_Thumbnail, Desc, Price, inStock, User_Id, Buy_Quantity }) {
    this.P_Id = P_Id;
    this.P_Name = P_Name;
    this.P_Thumbnail = P_Thumbnail;
    this.Desc = Desc;
    this.Price = Price;
    this.inStock = inStock;
    this.User_Id = User_Id;
    this.Buy_Quantity = Buy_Quantity;
  }

  isAvailable() {
    return this.inStock ? "Available" : "Unavailable";
  }
}

export default ProductDetailsModel;

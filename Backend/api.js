const express = require('express');
const mysql= require('mysql');
const jwt = require('jsonwebtoken');
const cors= require('cors');

const bodyParser = require('body-parser');
const dbConfig = {
  //  host: 'sql6.freesqldatabase.com',
  //  user: 'sql6699432',
  //  password: 'Mgtfa9QE3F',
  //  database: 'sql6699432'
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydatabase'
  };
  
  var db = mysql.createConnection(dbConfig);

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Secret key for JWT signing
const secretKey = '12KEY77';

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/api/hello', (req, res) => {
    res.json({message: 'Hello, World!' });
});

app.get('/api/userlist', (req, res) => {
    db.query("SELECT * FROM Users", function(err, rows, fields){
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      console.log(rows);
      res.json({ result: rows, message: "users lists" });
    });
  });
  
  app.post('/api/signup', (req, res) => {
    const { Name, Email, Password, Contact } = req.body;

    // Log the incoming request body
    console.log("Request Body:", req.body);

    // Validate that all fields are provided
    if (!Name) {
        res.status(400).json({ error: "Name is required" });
        return;
    }
    if (!Email) {
        res.status(400).json({ error: "Email is required" });
        return;
    }
    if (!Password) {
        res.status(400).json({ error: "Password is required" });
        return;
    }
    if (!Contact) {
        res.status(400).json({ error: "Contact is required" });
        return;
    }

    const query = "INSERT INTO Users (Name, Email, Password, Contact) VALUES (?, ?, ?, ?)";
db.query(query, [Name, Email, Password, Contact], function(err, result) {
    if (err) {
        console.error("Database error:", err);
        res.status(500).json({ error: "An error occurred while creating the user" });
        return;
    }

    // Generate JWT token
    const token = jwt.sign({ email: Email }, '12Key77', { expiresIn: '48h' });

    // Update the user's token in the database
    const tokenQuery = "UPDATE Users SET Token = ? WHERE Email = ?";
    db.query(tokenQuery, [token, Email], function(err, tokenResult) {
        if (err) {
            console.error("Error updating token:", err);
            res.status(500).json({ error: "Error updating token" });
            return;
        }

        console.log("Token created:", token);
        res.json({ message: "User created successfully", token: token });
    });
});
});


app.post('/api/login', (req, res) => {
    const { Email, Password } = req.body;
    const query = "SELECT Email, Password FROM users WHERE Email= ? AND Password= ?";
   // console.log(query.res);
    db.query(query, [ Email, Password ], function(err, result) {
      if (err) {
        console.log("Error:", err);
       res.status(500).json({ error: err });
        return;
      }
      if (result.length > 0) {
        // User credentials are valid, generate JWT token
        const token = jwt.sign({ email: Email },'12Key77', { expiresIn: '48h' });
        token_query = "UPDATE users SET Token = SHA2(UUID(), 256) WHERE Email= ?";
        // Executing the token query to update the token in the database
        db.query(token_query,[Email], function(err, tokenResult) {
          if (err) {
              console.log("Something went wrong", err);
              res.status(500).json({ error: "Error updating token" });
              return;
          }
        console.log("Token created", token)
        // Send the token along with the response
        res.json({ message: "User details exist.",token: token });
    }); 
  }else {
      console.log("User not found")
      res.status(404).json({ error: "No user found." });
    }
    });
  });
  
  app.delete('/api/delete-user', (req, res) => {
    const { Email } = req.body;
    const query = "DELETE FROM Users WHERE Email = ?";
    db.query(query, [ Email ], function(err, result) {
      if (err) {
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.json({ message: "User deleted successfully" });
    });
  });

  app.put('/api/update-user', (req, res) => {
    const { User_Id, Fav_Products } = req.body;
    const query = "UPDATE Users SET Fav_Products = ? WHERE User_Id = ?";
    db.query(query, [Fav_Products, User_Id], function(err, result) {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      res.json({ message: "User updated successfully" });
    });
  });

 
    app.post('/api/create-products', (req, res) => {
      const { Cat_Id, P_Name, Desc, Quantity, inStock, Price, P_Thumbnail } = req.body;
      const query = "INSERT INTO products (Cat_Id, P_Name, `Desc`, Quantity, inStock, Price, P_Thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(query, [Cat_Id, P_Name, Desc, Quantity, inStock, Price, P_Thumbnail], function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err });
          return;
        }
        res.json({ message: "Product added successfully" });
      });
    });
  
    app.delete('/api/delete-products', (req, res) => {
      const { Cat_Id, P_Name, Desc, Quantity, inStock, Price, P_Thumbnail } = req.body;
      const query = "DELETE FROM Products WHERE Product_Id = ?";
      db.query(query, [ Cat_Id, P_Name, `Desc`, Quantity, inStock, Price, P_Thumbnail ], function(err, result) {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json({ message: "Product deleted successfully" });
      });
    });

    app.get('/api/productlist', (req,res) => {
      const { P_Id, Cat_Id, P_Name, Desc, Quantity, inStock, Price, P_Thumbnail } = req.body;
      const query = "SELECT * FROM products WHERE ? IS NULL OR Cat_Id = ?";
      db.query(query, [Cat_Id, Cat_Id], (err, rows) =>{
        if(err){
          res.status(500).json({ error: err});
          return;
        }
        res.status(200).json({
          message: "Data fetched successfully",
          data: rows
      });
      });
    })

    app.put('/api/update-product', (req,res) => {
      const { Product_Name, Price } = req.body; 
      const query = "UPDATE products SET Price = ? WHERE Product_Name = ?";
      db.query(query, [ Price, Product_Name ], function(err, result) {
        if(err){
          res.status(500).json({ error: 'Internal Server Error'});
          return;
        }
        res.json({message: 'Product updated successfully'})
      });
    });

    // var sql = "CREATE TABLE clients (Client_Id VARCHAR(255), Client_Name VARCHAR(255), Country VARCHAR(255))";
    // db.query(sql, function (err, result) {
    //  if (err) throw err;
    //  console.log("Table created");
    // });

    app.post('/api/create-client', (req, res) => {
      const { Client_Id, Client_Name, Country } = req.body;
      const query = "INSERT INTO clients (Client_Id, Client_Name, Country) VALUES (?, ?, ?)";
      db.query(query, [Client_Id, Client_Name, Country], function(err, result) {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json({ message: "Client created successfully" });
      });
    });

    app.get('/api/clientlist', (req, res) => {
      const { Client_Id, Client_Name, Country } = req.body;
      const query = "SELECT * FROM clients";
      db.query(query, [Client_Id, Client_Name, Country], function(err, result) {
        if (err) {
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }
        res.json({ message: "Client fetched successfully" });
      });
    }); 

    app.put('/api/update-client', (req, res) => {
      const { Client_Id, Client_Name } = req.body;
      const query = "UPDATE clients SET Client_Name = ? WHERE Client_Id = ?";
      db.query(query, [Client_Name, Client_Id] , function(err, result) {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json({ message: "Client updated successfully" });
      });
    });

    app.delete('/api/delete-client', (req, res) => {
      const { Client_Id, Client_Name, Country } = req.body;
      const query = "DELETE FROM clients WHERE Client_Id = ?";
      db.query(query, [Client_Id, Client_Name, Country], function(err, result) {        
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json({ message: "Client deleted successfully" });
      });
    });

    app.post('/api/favourite_products', (req, res) => {
      const { User_Id, Fav_Pid } = req.body;
      const query = "INSERT INTO favourite_products (User_Id, Fav_Pid ) VALUES ( ?, ?)";
      db.query(query, [User_Id, Fav_Pid], function(err, result) {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json({ message: "Favourite products added successfully" });
      });
    });

    app.get('/api/fav_productlist', (req, res) => {
      const { User_Id, Fav_Pid } = req.body;
      const query = "SELECT * FROM favourite_products";
      db.query(query, [User_Id, Fav_Pid], function(err, result) {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json({ message: "Favourite products fetched successfully" });
      });
    });

       
    app.get('/api/productimage', (req, res) => {
      const { Product_Id, Product_URL } = req.body;
      const query = "SELECT * FROM product_images";
      db.query(query, [Product_Id, Product_URL], function(err, result) {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json({ message: "Favourite product fetched successfully" });
      });
    });
  
    app.put('/api/update_product_cart', (req, res) => {
      const { Product_Id, Quantity, Price } = req.body;
      const query = "UPDATE product_cart SET Quantity = ?, Price = ? WHERE Product_Id = ?";
      db.query(query, [Quantity, Price, Product_Id], function(err, result) {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json({ message: "Product cart updated successfully" });
      });
    });

    app.delete('/api/delete_product_cart', (req, res) => {
      const { Product_Id, Quantity, Price } = req.body;
      const query = "DELETE FROM product_cart WHERE Product_Id = ?";
      db.query(query, [Product_Id, Quantity, Price], function(err, result) {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json({ message: "Product deleted from the cart successfully" });
      });
    });

    app.get('/api/Categorylist', (req,res) => {
      const { Cat_Id, Cat_Name, Cat_Image } = req.body;
      const query = "SELECT * FROM categories WHERE ? IS NULL OR Cat_Id = ?";
      db.query(query, [Cat_Id, Cat_Id], (err, rows) =>{
        if(err){
          res.status(500).json({ error: err});
          return;
        }
        res.status(200).json({
          message: "Data fetched successfully",
          data: rows
      });
      });
    })

    app.post('/api/Add_productcart', (req, res) => {
      try {
        const { User_Id, P_Id, Buy_Quantity, Price } = req.body;
    
        // Calculate Total_Price
        const Total_Price = Buy_Quantity * Price;
    
        const query = "INSERT INTO cart (User_Id, P_Id, Buy_Quantity, Price) VALUES (?, ?, ?, ?)";
    
        db.query(query, [User_Id, P_Id, Buy_Quantity, Price], function(err, result) {
          if (err) {
            console.error('Database query error:', err); // Log the error for debugging purposes
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          res.json({ message: "Products added to the cart successfully" });
        });
      } catch (err) {
        console.error('Server error:', err); // Log the error for debugging purposes
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
      
    app.post('/api/Cartproducts', (req,res) => {
      const User_Id = req.body.User_Id;
      console.log('Database User_Id 355 query error:', User_Id); 
      const query = "SELECT cart.User_Id,products.P_Id,products.P_Name,products.Desc,products.inStock,products.Price,products.P_Thumbnail,cart.Buy_Quantity,cart.Total_Price FROM cart JOIN products ON cart.P_Id = products.P_Id WHERE cart.User_Id = ?";
      db.query(query, [User_Id], (err, rows) =>{
        if(err){
          res.status(500).json({ error: err});
          return;
        }
        res.status(200).json({
          message: "Data fetched successfully",
          data: rows
      });
      });
    })

    app.delete('/api/Del_CartProduct', (req, res) => {
      const { P_Id } = req.body;
      const query = "DELETE FROM cart WHERE P_Id = ?";
      db.query(query, [P_Id], function(err, result) {
        if (err) {
          res.status(500).json({ error: err });
          return;
        }
        res.json({ message: "Favourite product deleted successfully" });
      });
    });

    app.put('/api/Update_Cartproduct', (req, res) => {
      const { Buy_Quantity,User_Id, P_Id} = req.body;
    
  if (!User_Id || !P_Id || !Buy_Quantity) {
    return res.status(400).send('User_Id, P_Id, and Buy_Quantity are required');
  }

  const sql = `UPDATE cart SET Buy_Quantity = ?, Total_Price = Buy_Quantity * Price WHERE User_Id = ? AND P_Id = ?`;

  db.query(sql, [Buy_Quantity, User_Id, P_Id], (err, result) => {
    if (err) {
      return res.status(500).send('Error updating cart product',err);
    }
    if (result.affectedRows === 0) {
      return res.status(404).send('Cart product not found');
    }
    res.send('Cart product updated successfully');
  });
});

app.post('/api/ProductDetails', (req,res) => {
  const P_Id = req.body.P_Id; // Extract P_Id from the request body
  if (!P_Id) {
    res.status(400).json({ error: 'Product ID is required' });
    return;
  }
  console.log('Database Product_Id 403 query error:', P_Id); 
  const query = "SELECT P_Name, `Desc`, Quantity, inStock, Price, P_Thumbnail FROM products WHERE P_Id = ?";
  db.query(query, [P_Id], (err, rows) =>{
    if(err){
      console.error('Error executing query:', err);
      res.status(500).json({ error: err});
      return;
    }
    console.log("ProductDetails fetched: ",rows);
    res.status(200).json({
      message: "Data fetched successfully",
     data: rows
  });
  });
})

app.post('/api/Userlocation', (req,res) => {
  const { Email } = req.body;
  console.log('Database Product_Id 439 query error:', Email);
  const query = "SELECT Name,City, Pincode FROM users WHERE Email = ?";
  db.query(query, [Email], (err, rows) =>{
    if(err){
      res.status(500).json({ error: err});
      return;
    }
    res.status(200).json({
      message: "Location and data fetched successfully",
      data: rows
  });
  });
})

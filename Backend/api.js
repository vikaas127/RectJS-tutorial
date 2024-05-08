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
  app.post('/api/create-user', (req, res) => {
    const { Name, Email, Password, Contact } = req.body;
    const query = "INSERT INTO Users (Name, Email, Password, Contact) VALUES (?, ?, ?, ?)";
    db.query(query, [Name, Email, Password, Contact ], function(err, result) {
      if (err) {
        res.status(500).json({ error: err });
        return;
      }
      res.json({ message: "User created successfully" });
    });
  });

  app.post('/api/login', (req, res) => {
    const { Email, Password } = req.body;
    const query = "SELECT Email, Password FROM users WHERE Email= ? AND Password= ?";
    console.log(query.res);
    db.query(query, [ Email, Password ], function(err, result) {
      if (err) {
        console.log(err);
       res.status(500).json({ error: err });
        return;
      }
      if (result.length > 0) {
        // User credentials are valid, generate JWT token
        const token = jwt.sign({ email: Email }, '12KEY77', { expiresIn: '10h' });
        // Send the token along with the response
        res.json({ message: "User details exist." });
    } else {
      console.log("User not found")
      res.status(404).json({ error: "User not found." });
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
      const { Product_Id, Product_Name, Description, Price, Category, Brand, Stock_Quantity, Image_URL, Rating } = req.body;
      const query = "INSERT INTO Products (Product_Name, Description, Price, Category, Brand, Stock_Quantity, Image_URL, Rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(query, [Product_Id, Product_Name, Description, Price, Category, Brand, Stock_Quantity, Image_URL, Rating], function(err, result) {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err });
          return;
        }
        res.json({ message: "Product added successfully" });
      });
    });
  
    app.delete('/api/delete-products', (req, res) => {
      const { Product_Id, Product_Name, Description, Price, Category, Brand, Stock_Quantity, Image_URL, Rating } = req.body;
      const query = "DELETE FROM Products WHERE Product_Id = ?";
      db.query(query, [ Product_Id, Product_Name, Description, Price, Category, Brand, Stock_Quantity, Image_URL, Rating ], function(err, result) {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json({ message: "Product deleted successfully" });
      });
    });

    app.get('/api/productlist', (req,res) => {
      const { Product_Id, Product_Name, Description, Price, Category, Brand, Stock_Quantity, Image_URL, Rating } = req.body;
      const query = "SELECT p.*, pi.Product_URL FROM products p INNER JOIN product_images pi ON p.Product_Id = pi.Product_Id";

      db.query(query, function(err, rows, fields) {
        if(err){
          res.status(500).json({ error: 'Internal Server Error'});
          return;
        }
        res.json({message: rows })
      });
    })

    app.put('/api/update-product', (req,res) => {
      const { Product_Name, Price } = req.body; 
      const query = "UPDATE Products SET Price = ? WHERE Product_Name = ?";
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

    app.put('/api/update_favproducts', (req, res) => {
      const { User_id, Fav_Pid } = req.body;
      const query = "UPDATE favourite_products SET Fav_Pid = ? WHERE User_id = ?";
      db.query(query, [User_id, Fav_Pid], function(err, result) {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json({ message: "Favourite products updated successfully" });
      });
    });

    app.delete('/api/delete_favproducts', (req, res) => {
      const { User_id, Fav_Pid } = req.body;
      const query = "DELETE FROM favourite_products WHERE User_id = ?";
      db.query(query, [User_id, Fav_Pid], function(err, result) {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json({ message: "Favourite product deleted successfully" });
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
  
    app.post('/api/product_cart', (req, res) => {
      const { Product_Id, Quantity, Price } = req.body;
      const query = "INSERT INTO product_cart (Product_Id, Quantity, Price) VALUES (?, ?, ?)";
      db.query(query, [Product_Id, Quantity, Price], function(err, result) {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        res.json({ message: "Products added to the cart successfully" });
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

    app.get('/api/product_cart', (req, res) => {
      const { Product_Id, Quantity, Price } = req.body;
      const query = "SELECT p.Product_Id,p.Name,p.Description,p.Brand,p.Rating,pi.Product_URL,pc.Quantity,pc.Price * Quantity AS Total_price FROM products p LEFT JOIN product_images pi ON p.Product_Id = pi.Product_Id LEFT JOIN Product_cart pc ON p.Product_Id = pc.Product_Id";
      
      db.query(query, [Product_Id, Quantity, Price], function(err, result) {
        if (err) {
          res.status(500).json({ error: err });
          return;
        }
        res.json({ message: result });
      });
    });
    
  

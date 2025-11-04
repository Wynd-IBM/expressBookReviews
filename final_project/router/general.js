const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;

  // Check if username or password is missing
  if (!username || !password) {
    return res.json({ message: "Username/password must be provided" });
  }

  if (isValid(username)) {
    return res.json({ message: "Username already exists" });
  }
  
  users.push({"username": username, "password": password});
  return res.json({ message: "User registered successfully" });

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let book = books[isbn];
    res.send(book); 
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author.toLowerCase();
    let authorBooks = [];

    for (let book in books){
        if (books[book].author.toLowerCase() === author){
            authorBooks.push(books[book]);
        }
    }

    res.send(authorBooks); 
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title.toLowerCase();

    for (let book in books){
        if (books[book].title.toLowerCase() === title){
            res.send(books[book]);
        }
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let book = books[isbn];
    res.send(book); 
});

module.exports.general = public_users;

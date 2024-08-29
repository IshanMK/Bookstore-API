const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models");

const app = express();
const port = 3000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/bookstore", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific book by ISBN
app.get("/books/isbn/:isbn", async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new book
app.post("/books", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    price: req.body.price,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a book by ISBN
app.put("/books/isbn/:isbn", async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn });
    if (book) {
      book.title = req.body.title || book.title;
      book.author = req.body.author || book.author;
      book.price = req.body.price || book.price;
      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a book by ISBN
app.delete("/books/isbn/:isbn", async (req, res) => {
  try {
    const result = await Book.deleteOne({ isbn: req.params.isbn });
    if (result.deletedCount > 0) {
      res.json({ message: "Book deleted" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

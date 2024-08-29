const mongoose = require("mongoose");
const Book = require("./models"); // Import the Book model

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/bookstore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    // Clear existing data
    await Book.deleteMany({});

    // Sample book entries
    const books = [
      {
        title: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        isbn: "9780596517748",
        price: 29.99,
      },
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "9780132350884",
        price: 34.95,
      },
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt and David Thomas",
        isbn: "9780201616224",
        price: 39.99,
      },
      {
        title: "You Don’t Know JS",
        author: "Kyle Simpson",
        isbn: "9781491904244",
        price: 44.99,
      },
    ];

    // Insert sample books into the database
    await Book.insertMany(books);

    console.log("Database seeded successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error seeding the database:", err);
  });

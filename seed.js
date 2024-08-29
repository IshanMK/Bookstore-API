const mongoose = require("mongoose");
const Book = require("./models"); // Adjust the path if necessary

const mongoURI = "mongodb://localhost:27017/bookstore"; // Local MongoDB URI

async function seedDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    console.log("Deleting existing data...");
    await Book.deleteMany({}); // Clear existing data

    console.log("Inserting new data...");
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

    await Book.insertMany(books);

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err.message);
  } finally {
    await mongoose.connection.close();
  }
}

seedDB();

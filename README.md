# Bookstore API

## Overview

The Bookstore API is a RESTful service built with Node.js and Express, providing a way to manage a collection of books. The API supports creating, retrieving, updating, and deleting books, with data stored in a MongoDB database.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete books.
- **MongoDB Integration**: Stores and retrieves book data.
- **Dockerized Application**: Easily deployable with Docker and Docker Compose.
- **Automated Testing**: CI pipeline with automated tests for the API endpoints.

## Prerequisites

- **Docker** and **Docker Compose** installed on your system.
- **Node.js** and **npm** (for local development).

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/IshanMK/Bookstore-API
cd Bookstore-API
```

### 2. Build and Run the Docker Containers

```bash
docker-compose up --build -d
```

This will start the MongoDB and the Node.js application in the background.

### 3. Seed the Database

```bash
docker-compose exec app node seed.js
```

This command seeds the database with initial book data.

### 4. Access the API

The API should be running on `http://localhost:3000`.

### 5. Test the API Endpoints

You can use the following cURL commands to test the API:

- Create a Book:

```bash
curl -X POST http://localhost:3000/books \
-H "Content-Type: application/json" \
-d '{"title": "The Art of Computer Programming", "author": "Donald Knuth", "isbn": "9780201896831", "price": 89.99}'
```

- Get All Books:

```bash
curl -X GET http://localhost:3000/books
```

- Get a Book by ISBN:

```bash
curl -X GET http://localhost:3000/books/isbn/9780201896831
```

- Update a Book:

```bash
curl -X PUT http://localhost:3000/books/isbn/9780201896831 \
-H "Content-Type: application/json" \
-d '{"price": 99.99}'
```

- Delete a Book:

```bash
curl -X DELETE http://localhost:3000/books/isbn/9780201896831
```

### Running Tests

The project includes automated tests that are run using GitHub Actions. The tests are triggered on every push or pull request to the main branch.

### Running Tests Locally

If you want to run the tests locally, ensure that your API is running and use the following commands:

```bash
# Example: Test Create Book
curl -X POST http://localhost:3000/books \
-H "Content-Type: application/json" \
-d '{"title": "The Art of Computer Programming", "author": "Donald Knuth", "isbn": "9780201896831", "price": 89.99}' \
-w "%{http_code}" -o response.log
grep -q "201" response.log || exit 1
```

### Continuous Integration

This project uses GitHub Actions for Continuous Integration (CI). The workflow is defined in .github/workflows/docker-image.yml and includes the following steps:

- Checkout Code: Pulls the latest code from the repository.
- Set up Docker Buildx: Prepares the Docker environment.
- Install Docker Compose: Ensures Docker Compose is available.
- Build Docker Image: Builds the Docker image for the application.
- Run Containers: Starts the application and MongoDB containers.
- Seed the Database: Seeds initial data into MongoDB.
- Run API Tests: Tests various API endpoints.
- Clean Up: Stops and removes Docker containers.

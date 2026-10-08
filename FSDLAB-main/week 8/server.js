const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// In-memory data store for books
let books = [
    { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
    { id: 2, title: "1984", author: "George Orwell", year: 1949 }
];

// 1. GET /api/books - Retrieve all books
app.get('/api/books', (req, res) => {                                                     
    res.status(200).json(books);
});

// 2. GET /api/books/:id - Retrieve a single book by ID
app.get('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId);
    
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
});

// 3. POST /api/books - Add a new book
app.post('/api/books', (req, res) => {
    const { title, author, year } = req.body;

    if (!title || !author || !year) {
        return res.status(400).json({ message: "Please provide title, author, and year" });
    }

    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        year
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

// 4. PUT /api/books/:id - Update an existing book completely
app.put('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const { title, author, year } = req.body;

    if (!title || !author || !year) {
        return res.status(400).json({ message: "Please provide title, author, and year" });
    }

    books[bookIndex] = { id: bookId, title, author, year };
    res.status(200).json(books[bookIndex]);
});

// 5. DELETE /api/books/:id - Delete a book
app.delete('/api/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    books.splice(bookIndex, 1);
    res.status(200).json({ message: "Book successfully deleted" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

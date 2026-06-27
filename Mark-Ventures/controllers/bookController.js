const Book = require("../models/Book");

// Create Book
const createBook = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const book = await Book.create(req.body);

    res.status(201).json(book);
  } catch (error) {
    console.error("Create Book Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Books
const getBooks = async (req, res) => {
  try {
    const { title, author, genre } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const sort = req.query.sort || "-createdAt";

    let filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (author) {
      filter.author = { $regex: author, $options: "i" };
    }

    if (genre) {
      filter.genre = { $regex: genre, $options: "i" };
    }

    const books = await Book.find(filter).sort({title:1});

    res.status(200).json(books);
  } catch (error) {
    console.error("Get Books Error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  deleteBook,
  updateBook,
};
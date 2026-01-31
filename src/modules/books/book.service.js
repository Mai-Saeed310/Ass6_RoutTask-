import { db } from "../../DB/connectionDB.js";


export const createBooksCollection = async (req, res) => {
  try {
    // check if the collection is already exist or not 
    const collections = await db.listCollections({ name: "books" }).toArray();

     if (collections.length > 0) {
      return res.status(200).json({
        message: "Books collection already exists"
      });
    }

    await db.createCollection("books", {
      validator: {
        title: { $exists: true, $ne: "" }
      }
    });

    res.status(201).json({message: "Books collection created successfully"});

  } catch (error) {
   res.status(500).json({
      error: error.message
    });
  }
};

export const createBooksIndex = async (req, res) => {
  try {
    const index = await db.collection("books").createIndex({ title: 1 });
    res.status(201).json({
        message: "Index created successfully",
        index: index
        });

  } catch (error) {
   res.status(500).json({
      error: error.message
    });
  }
};

export const insertBook = async (req, res) => {

  try {

    const result = await db.collection("books").insertOne(req.body);

    res.status(201).json({
      message: "Book inserted successfully",
      bookId: result.insertedId
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const insertManyBook = async (req, res) => {

   try {
    const books = req.body;

    // validation
    if (!Array.isArray(books) || books.length < 3) {
      return res.status(400).json({
        message: "Please provide at least 3 books"
      });
    }

    const result = await db.collection("books").insertMany(books);

    res.status(201).json({
      message: "Books inserted successfully",
      insertedIds: result
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBook = async (req, res) => {
    try {
    const { title } = req.params;

    const result = await db.collection("books").updateOne(
      { title },
      { $set: { years: 2022 } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json({
      message: "Book updated successfully",
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount
    });
   
  } catch (error) {
        res.status(500).json({ error: error.message });

  }
};

export const getBookTitle = async (req, res) => {
    try {
    const { title } = req.query;
    const book = await db.collection("books").findOne({title});
     if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json(book);
  } catch (error) {
        res.status(500).json({ error: error.message });

  }
};

export const getBookYear = async (req, res) => {
  const { from, to } = req.query;
  try {
      const books = await db
      .collection("books")
      .find({
        years: { $gte: Number(from), $lte: Number(to) }
      })
      .toArray();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookGenre = async (req, res) => {
try {
    const { genre } = req.query;

    const books = await db.collection("books").find({ genres: genre }) .toArray();

    res.status(200).json(books);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBooksSkip = async (req, res) => {
try {
   const books = await db.collection("books").find({}) .sort({ years: -1 }).skip(2).limit(3).toArray();

    res.status(200).json(books);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBooksYearInteger = async (req, res) => {
try {

const books = await db.collection("books").find({ years: { $type: "int" } }).toArray();
    res.status(200).json(books);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBooksExcludeGenres = async (req, res) => {
try {

 const excludedGenres = ["Horror", "Science Fiction"];

    const books = await db.collection("books").find({genres: { $nin: excludedGenres }}).toArray();

    res.status(200).json(books);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBooks = async (req, res) => {
  try {
    const { year } = req.query;  
    // check if there are books before this year or not 
    const booksToDelete = await db.collection("books").find({ years: { $lt: Number(year) } }).toArray();

    if (booksToDelete.length === 0) {
      return res.status(404).json({ message: `No books found  before this year ${year}` });
    }
    const result = await db.collection("books").deleteMany({ years: { $lt: Number(year) } }); 
    res.status(200).json({message: `Books deleted successfully`,deletedCount: result});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAggregate1 = async (req, res) => {
  try {
   const books = await db.collection("books").aggregate([
        { $match: { years: { $gt: 2000 } } },   
        { $sort: { years: -1 } }                
      ]).toArray();

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAggregate2 = async (req, res) => {

  try {
     const books = await db.collection("books").aggregate([
        { $match: { years: { $gt: 2000 } } },         
        { $project: { _id: 0, title: 1, author: 1, years: 1 } } 
      ]).toArray();
    res.status(200).json(books);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAggregate3 = async (req, res) => {
  try {
 const result = await db.collection("books").aggregate([
      { $unwind: "$genres" }]).toArray();;

    res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAggregate4 = async (req, res) => {
  try {
 const result = await db.collection("books").aggregate([
        {
          $lookup: {
            from: "logs",           
            localField: "_id",      
            foreignField: "book_id",
            as: "logs"
          }
        }
      ]).toArray();
      res.status(200).json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



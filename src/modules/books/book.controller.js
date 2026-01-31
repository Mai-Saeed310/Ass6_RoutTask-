import { Router } from "express"; 
import { createBooksCollection, createBooksIndex, deleteBooks, getAggregate1, getAggregate2, 
getAggregate3, getAggregate4, getBookGenre, getBooksExcludeGenres, getBooksSkip, getBooksYearInteger,
 getBookTitle, getBookYear, insertBook,
insertManyBook, updateBook } from "./book.service.js";

export const createCollection = Router (); 
export const bookRouter = Router (); 


// collection operations
createCollection.post("/", createBooksCollection);
createCollection.post("/index", createBooksIndex);

// document operations
bookRouter.post("/", insertBook);
bookRouter.post("/batch", insertManyBook);
bookRouter.patch("/:title", updateBook);
bookRouter.get("/title", getBookTitle);
bookRouter.get("/year", getBookYear);
bookRouter.get("/genre", getBookGenre);
bookRouter.get("/skip-limit", getBooksSkip);
bookRouter.get("/year-integer", getBooksYearInteger);
bookRouter.get("/exclude-genres", getBooksExcludeGenres);
bookRouter.delete("/before-year", deleteBooks);
bookRouter.get("/aggregate1", getAggregate1);
bookRouter.get("/aggregate2", getAggregate2);
bookRouter.get("/aggregate3", getAggregate3);
bookRouter.get("/aggregate4", getAggregate4);

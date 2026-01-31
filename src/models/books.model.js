import { db } from "../DB/connectionDB.js";


// Create model (collection)

const booksModel = db.createCollection("books");

export default booksModel ; 
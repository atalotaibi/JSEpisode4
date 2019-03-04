/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  // Your code goes here
  return books.filter(book => {
    if (book.id === bookId) {
      return book;
    } else {
      return undefined;
    }
  })[0];
}

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  // Your code goes here
  return authors.find(author => {
    if (author.name.toUpperCase() === authorName.toUpperCase()) {
      return author;
    } else {
      return undefined;
    }
  });
}

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  // Your code goes here
  return authors.map(author1 => {
    const authorKey = "author";
    const bookCountKey = "bookCount";
    return { author: author1.name, bookCount: author1.books.length };
  });
}

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};
  books.forEach(book => {
    if (colors[book.color]) {
      colors[book.color].push(book.title);
    } else {
      colors[book.color] = [book.title];
    }
  });
  return colors;
}

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here
  const author = getAuthorByName(authorName, authors);
  if (author === undefined) {
    return [];
  }
  return author.books.map(bookID => getBookById(bookID, books).title);
}

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  // Your code goes here
  let prolificAuthor = authors[0];
  authors.forEach(author => {
    if (author.books.length > prolificAuthor.books.length) {
      prolificAuthor = author;
    }
  });
  return prolificAuthor.name;
}

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  // Your code goes here
  const book = getBookById(bookId, books);
  const titles = [];
  book.authors.forEach(author => {
    const bookTitles = titlesByAuthorName(author.name, authors, books).filter(
      book => !titles.includes(book)
    );
    titles.push(...bookTitles);
  });
  return titles;
}

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  // Your code goes here
  authors.forEach(author => {
    author.coAuthoringCount = 0;
    authors.forEach(secondAuthor => {
      if (author.name !== secondAuthor.name) {
        const sharedBooks = secondAuthor.books.filter(book => {
          return author.books.includes(book);
        });
        author.coAuthoringCount += sharedBooks.length;
      }
    });
  });

  let friendlyAuthor = authors[0];
  authors.forEach(author => {
    if (author.coAuthoringCount > friendlyAuthor.coAuthoringCount) {
      friendlyAuthor = author;
    }
  });
  return friendlyAuthor.name;
}

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */

// const authors = require("./authors.json");
// const books = require("./books.json");

// console.log(getBookById(12, books));
// console.log(getAuthorByName("J.K. Rowling", authors));
// console.log(bookCountsByAuthor(authors));
// console.log(booksByColor(books));
// console.log(titlesByAuthorName("George R.R. Martin", authors, books));
// console.log(mostProlificAuthor(authors));
// console.log(relatedBooks(50, authors, books));
// console.log(friendliestAuthor(authors));

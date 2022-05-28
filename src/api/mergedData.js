import { deleteSingleAuthor, getAuthorBooks, getSingleAuthor } from './authorData';
import { getSingleBook, deleteBook } from './bookData';

const viewBookDetails = (bookFirebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(bookFirebaseKey)
    .then((booksObject) => {
      getSingleAuthor(booksObject.author_id)
        .then((authorObject) => {
          resolve({ authorObject, ...booksObject });
        });
    }).catch((error) => reject(error));
});

const viewAuthorDetails = (authorFirebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(authorFirebaseKey)
    .then((authorObject) => {
      getAuthorBooks(authorFirebaseKey)
        .then((authorBooksArray) => {
          resolve({ authorBooksArray, ...authorObject });
        });
    }).catch((error) => reject(error));
});

const deleteAuthorBooks = (authorId) => new Promise((resolve, reject) => {
  getAuthorBooks(authorId).then((booksArray) => {
    const deleteBookPromises = booksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(authorId).then(resolve);
    });
  }).catch((error) => reject(error));
});
export {
  viewBookDetails, viewAuthorDetails, deleteAuthorBooks, getAuthorBooks 
};

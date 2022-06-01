import { createBook, updateBook } from '../../api/bookData';
import { showBooks } from '../components/pages/books';
import { showAuthors } from '../components/pages/authors';
import { updateAuthor } from '../../api/authorData';

const formEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('submit', (e) => {
    e.preventDefault();
    // TODO: CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        description: document.querySelector('#description').value,
        sale: document.querySelector('#sale').value,
        author_id: document.querySelector('#author_id').value,
        uid
      };

      createBook(bookObject).then((booksArray) => showBooks(booksArray));
    }

    // TODO: CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      const [, firebaseKey] = e.target.id.split('--');
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        description: document.querySelector('#description').value,
        sale: document.querySelector('#sale').value,
        author_id: document.querySelector('#author_id').value,
        firebaseKey
      };

      updateBook(bookObject).then(showBooks);
    }

    // FIXME: ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      const authorObject = {
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').value,
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        uid
      };
      updateAuthor(authorObject).then(showAuthors);
    }

    // FIXME:ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const [, firebaseKey] = e.target.id.split('--');
      const authorObject = {
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').value,
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        firebaseKey
      };
      updateAuthor(authorObject).then(showAuthors);
      /* updateAuthor(authorObject).then(() => {
        getAuthors(uid).then((response) => showAuthors(response)) */
    }
  });
};

export default formEvents;

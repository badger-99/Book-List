const bookList = document.querySelector('#book-list');
const bookForm = document.querySelector('#book-form');
const formVisibility = document.querySelector('#form-visibility');
const contactDetails = document.querySelector('#contact-details');
const list = document.getElementById('list');
const addNew = document.getElementById('add-new');
const contact = document.getElementById('contact');
const heading = document.getElementById('header-name');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const bookArray = [];

const bookTamplate = (books, index) => `
<div class="book">
<p>"${books.title}" by ${books.author}</p>
<button type="button" class="remove" data-index="${index}">Remove</button>
</div>
`;

class UtilityFunctions {
  // Saving to Local Storage
  static setStorage = () => {
    localStorage.setItem('bookData', JSON.stringify(bookArray));
  };

  // Getting from Local Storage
  static getStorage = () => {
    const retrievedBooks = JSON.parse(localStorage.getItem('bookData'));
    return retrievedBooks;
  };

  // Showing books on browser
  static showBooks = () => {
    const retrievedBooks = this.getStorage();
    bookList.innerHTML = retrievedBooks
      .map((book, index) => bookTamplate(book, index))
      .join('');
  };

  // Add book method
  static addBook() {
    const book = {
      title: title.value,
      author: author.value,
    };
    bookArray.push(book);
    this.setStorage();
  }

  // Remove book method
  static removeBook(idx) {
    bookArray.splice(idx, 1);
    this.setStorage();
  }
}

bookArray.push(...UtilityFunctions.getStorage());
UtilityFunctions.showBooks();

// ADD button event listener
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  UtilityFunctions.addBook();
  bookForm.reset();
  UtilityFunctions.showBooks();
});

// Remove button event listener
bookList.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const bookNum = event.target.dataset.index;
    const idx = parseInt(bookNum, 10);
    UtilityFunctions.removeBook(idx);
    UtilityFunctions.showBooks();
  }
});

list.addEventListener('click', (e) => {
  e.preventDefault();
  bookList.classList.remove('hidden');
  formVisibility.classList.add('hidden');
  contactDetails.classList.add('hidden');
  heading.innerHTML = 'Awesome Books'
});

addNew.addEventListener('click', (e) => {
  e.preventDefault();
  bookList.classList.add('hidden');
  formVisibility.classList.remove('hidden');
  contactDetails.classList.add('hidden');
  heading.innerHTML = 'Add a new book';
});

contact.addEventListener('click', (e) => {
  e.preventDefault();
  bookList.classList.add('hidden');
  formVisibility.classList.add('hidden');
  contactDetails.classList.remove('hidden');
  heading.innerHTML = 'Contact information';
});

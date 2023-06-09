const container = document.querySelector('#book-list');
const bookEntry = document.querySelector('#book-input');
const title = document.querySelector('#title');
const author = document.querySelector('#author');

// Book template
const bookTemplate = (books, index) => `
<div class="book">
<p>"${books.title}" by ${books.author}</p>
<button type="button" class="remove" data-index="${index}">Remove</button>
<hr>
</div>
`;

// Helper functions
class UtilityFunctions {
  // Saving to Local Storage -> uses bookArray
  static setStorage = (array) => {
    localStorage.setItem('bookData', JSON.stringify(array));
  };

  // Getting from Local Storage
  static getStorage = () => {
    const retrievedBooks = JSON.parse(localStorage.getItem('bookData'));
    return retrievedBooks;
  };

  // Showing books on browser  -> uses container
  static showBooks = (element, template) => {
    const retrievedBooks = this.getStorage();
    element.innerHTML = retrievedBooks
      .map((book, index) => template(book, index))
      .join('');
  };

  static addBook(array, book) {
    array.push(book);
    this.setStorage(array)
  }

  static removeBook(array, idx) {
    array.splice(idx, 1);
    this.setStorage(array);
  }
}

// Book collection class
class BookCollection {
  constructor() {
    this.array = [];
  }

  getArray() {
    return this.array;
  }
}

// Book class
class Book{
  constructor(title, author) {
      this.title= title,
      this.author= author
  }

  getBook() {
    return { title: this.title, author: this.author };
  }
}

// initializing new array, populating it with localStorage, and rendering it
const bookList = new BookCollection()
let bookArray = bookList.getArray()
bookArray = [...UtilityFunctions.getStorage()]
UtilityFunctions.showBooks(container, bookTemplate)

// ADD button event listener
bookEntry
  .addEventListener('submit', (e) => {
    e.preventDefault();
    const book = new Book(title.value, author.value);
    const bookObj = book.getBook();
    bookEntry.reset();
    UtilityFunctions.addBook(bookArray, bookObj);
    UtilityFunctions.showBooks(container, bookTemplate);
  });
  
// Remove button event listener
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const bookNum = event.target.dataset.index;
    idx = parseInt(bookNum, 10);
    UtilityFunctions.removeBook(bookArray, idx);
    UtilityFunctions.showBooks(container, bookTemplate);
  }
});
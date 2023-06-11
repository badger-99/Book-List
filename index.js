const container = document.querySelector('#book-list');
const bookEntry = document.querySelector('#book-input');
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
    container.innerHTML = retrievedBooks
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
bookEntry.addEventListener('submit', (e) => {
  e.preventDefault();
  UtilityFunctions.addBook();
  bookEntry.reset();
  UtilityFunctions.showBooks();
});

// Remove button event listener
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const bookNum = event.target.dataset.index;
    const idx = parseInt(bookNum, 10);
    UtilityFunctions.removeBook(idx);
    UtilityFunctions.showBooks();
  }
});

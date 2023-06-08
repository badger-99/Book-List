const container = document.querySelector('#book-list');
const bookEntry = document.querySelector('#book-input');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const bookArray = [];

const bookTamplate = (books, index) => `
<div class="book">
<p>${books.title}</p>
<p>${books.author}</p>
<button type="button" class="remove" data-index="${index}">Remove</button>
<hr>
</div>
`;

// Saving to Local Storage
const setStorage = () => {
  const bookData = JSON.stringify(bookArray);
  localStorage.setItem('bookData', bookData);
};

// Getting from Local Storage
const getStorage = () => {
  const bookDataString = localStorage.getItem('bookData');
  const retrievedBooks = JSON.parse(bookDataString);
  return retrievedBooks;
};

// Showing books on browser
const showBooks = () => {
  const retrievedBooks = getStorage();
  const bookList = retrievedBooks
    .map((book, index) => bookTamplate(book, index))
    .join('');
  container.innerHTML = bookList;
};

// Add book method
function addBook() {
  const book = {
    title: title.value,
    author: author.value,
  }
  bookArray.push(book)
  setStorage()
}

// Remove book method
function removeBook(idx) {
  bookArray.splice(idx, 1)
  setStorage();
}

bookArray.push(...getStorage());
showBooks();

// ADD button event listener
bookEntry
  .addEventListener('submit', (e) => {
    e.preventDefault();
    addBook()
    bookEntry.reset()
    showBooks();
  });

// Remove button event listener
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const bookNum = event.target.dataset.index;
    idx = parseInt(bookNum, 10)
    removeBook(idx);
    showBooks();
  }
});

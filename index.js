const container = document.querySelector('#book-list')
const bookEntry = document.querySelector('#book-input')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const addBtn = document.querySelector('#add')
let bookArray = [];

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
  let bookData = JSON.stringify(bookArray);
  localStorage.setItem('bookData', bookData);
  }

// Getting from Local Storage
const getStorage = () => { 
  let bookDataString = localStorage.getItem('bookData');
  let retrievedBooks = JSON.parse(bookDataString);
  return retrievedBooks
}

// Showing books on browser
const showBooks = () => {
  let retrievedBooks = getStorage()
  let bookList = retrievedBooks
    .map((book, index) => bookTamplate(book, index))
    .join('');
  container.innerHTML = bookList;
}

showBooks()

// ADD button event listener
bookEntry
  .addEventListener('submit', (e) => {
    e.preventDefault();

    // adding books to array
    let book = {
      title: '',
      author: '',
    };
    book.title = title.value;
    book.author = author.value;
    bookArray.push(book);
    title.value = '';
    author.value = '';
    console.log(bookArray);

    //  updating localStorage
    setStorage();

    //  Rendering the books
    showBooks();
  })
  
  // Remove button event listener
  container.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove')) {
      let bookNum = event.target.dataset.index;
      bookArray.splice(parseInt(bookNum, 10), 1);

      //  updating localStorage
      setStorage();

      //  Rendering the books
      showBooks();
    }
  })
  
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
    console.log(bookArray);

    // Rendering the book
    const bookList = bookArray
      .map((book, index) => bookTamplate(book, index))
      .join('');
    container.innerHTML = bookList;

  })
  
  // Remove button event listener
container.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    let bookNum = event.target.dataset.index;
    bookArray.splice(parseInt(bookNum, 10), 1);
    let newBookArray = bookArray.map((book, index) => bookTamplate(book, index)).join('');
    container.innerHTML = newBookArray;      
    }
  })
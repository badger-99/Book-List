const container = document.querySelector('#book-list')
const bookEntry = document.querySelector('#book-input')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const addBtn = document.querySelector('#add')
const bookArray = [];



const bookTamplate = (books, index) => `
<div class="book">
<p>${books.title}</p>
<p>${books.author}</p>
<button type="button" class="remove" data-index="${index}">Remove</button>
<hr>
</div>
`;

// ADD button event listener
bookEntry.addEventListener('submit', (e) => {
  e.preventDefault()
  
  // adding books to array
  let book = {
    title: '',
    author: '',
  };
  book.title = title.value
  book.author = author.value
  bookArray.push(book)
  console.log(bookArray);
  
  // Rendering the books
  const bookList = bookArray.map((book, index) => bookTamplate(book, index)).join('')
  container.innerHTML = bookList

  // Remove button event listener
  const removeBtns = document.querySelectorAll('.remove')
  removeBtns.forEach((removeBtn, index) => {
    removeBtn.addEventListener('click', (event) => {
      const index = event.target.dataset.index
      console.log(index)
  })
  })
})

// if (bookArray.length > 0) {
// }


const container = document.querySelector('#book-list')
const bookEntry = document.querySelector('#book-input')
const title = document.querySelector('#title')
const author = document.querySelector('#author')
const addBtn = document.querySelector('#add')
const bookArray = [];
let book = {
  title: '',
  author: '',
  btn: '<button type="button" id="remove">Remove</button>',
};
if (bookArray.length > 0) {
  const removeBtn = document.querySelector('remove')
}

bookEntry.addEventListener('submit', (e) => {
  e.preventDefault()
  book.title = title.value
  book.author = author.value
  bookArray.push(book)
  console.log(bookArray);
})


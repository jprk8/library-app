const myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
}

//add Book prototype function to toggle read status
Book.prototype.toggleRead = function() {
    (this.read === false) ? this.read = true : this.read = false;
}

const hobbit = new Book('The Hobbit', 'J.R.R. Tolkiens', 295);
const ender = new Book(`Ender's Game`, 'Orson Scott Card', 324);
const mocking = new Book('To Kill a Mockingbird', 'Harper Lee', 281);
ender.toggleRead();
mocking.toggleRead();
myLibrary.push(hobbit);
myLibrary.push(ender);
myLibrary.push(mocking);
listBooks();

// function to display book array as cards
// recall this function to refresh the book container
function listBooks () {
    //remove all books in book-container in HTML to re-draw the library
    const bookContainer = document.querySelector('.book-container');
    const removeBooks = document.querySelectorAll('.book-container > .book');
    removeBooks.forEach((item) => {
        bookContainer.removeChild(item);
    })

    let arrayIndex = 0;
    for (const book of myLibrary) {
        const bookContainer = document.querySelector('.book-container');
        const showBook = document.createElement('div');
        const showTitle = document.createElement('div');
        const showAuthor = document.createElement('div');
        const showPages = document.createElement('div');

        //create togglable read status button
        const showRead = document.createElement('button');
        showRead.setAttribute('index', arrayIndex);
        showRead.addEventListener('click', () => {
            let i = showRead.getAttribute('index');
            myLibrary[i].toggleRead();
            listBooks();
        });
        const readStatus = document.createElement('span');
        showRead.appendChild(readStatus);

        showBook.classList.add('book');
        showTitle.classList.add('title');
        showAuthor.classList.add('author');
        showPages.classList.add('pages');

        showTitle.textContent = book.title;
        showAuthor.textContent = `By ${book.author}`
        showPages.textContent = `Pages: ${book.pages}`;
        if (book.read == false) {
            showRead.classList.remove('read-btn');
            showRead.classList.add('notread-btn');
            readStatus.textContent = 'Not Read';
        }
        else {
            showRead.classList.remove('notread-btn');
            showRead.classList.add('read-btn');
            readStatus.textContent = 'Done Reading';
        }
        
        showBook.appendChild(showTitle);
        showBook.appendChild(showAuthor);
        showBook.appendChild(showPages);
        showBook.appendChild(showRead);

        //add delete button and function
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('index', arrayIndex);
        deleteBtn.addEventListener('click', () => {
            myLibrary.splice(deleteBtn.getAttribute('index'), 1);
            listBooks();
        });
        showBook.appendChild(deleteBtn);
        arrayIndex++;

        bookContainer.appendChild(showBook);
    }
}

const dialog = document.querySelector('dialog');
const addForm = document.querySelector('form');
const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inputPages = document.getElementById('pages');
const inputRead = document.getElementById('read');

const addBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const confirmBtn = document.querySelector('.confirm-btn');

addBtn.addEventListener('click', () => {
    dialog.showModal();
});

closeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.close();
});

confirmBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addForm.reportValidity();
    if (addForm.checkValidity()) {
        const newBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value);
        if (inputRead.checked == true) newBook.toggleRead();
        myLibrary.push(newBook);
        addForm.reset();
        dialog.close();
        listBooks();
    }
});
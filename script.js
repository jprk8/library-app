const myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.info = function() {
        infoString = `${this.title};${this.author};${this.pages};`;
        if (this.read) return infoString += "read";
        else return infoString += "not read yet";
    }
}

const ender = new Book(`Ender's Game`, 'Orson Scott Card', 324);
const morrie = new Book('Tuesdays with Morrie', 'Mitch Albom', 192);
myLibrary.push(ender);
myLibrary.push(morrie);
listBooks();

// function to display book array as cards
function listBooks () {
    //remove all books in book-container in HTML to re-draw library
    const bookContainer = document.querySelector('.book-container');
    const removeBooks = document.querySelectorAll('.book-container > .book');
    removeBooks.forEach((item) => {
        bookContainer.removeChild(item);
    })

    for (const book of myLibrary) {
        const bookContainer = document.querySelector('.book-container');
        const showBook = document.createElement('div');
        const showTitle = document.createElement('div');
        const showAuthor = document.createElement('div');
        const showPages = document.createElement('div');
        const showRead = document.createElement('div');

        //need to add class after createElement
        showBook.classList.add('book');
        showTitle.classList.add('title');
        showAuthor.classList.add('author');
        showPages.classList.add('pages');
        showRead.classList.add('read');

        showTitle.textContent = book.title;
        showAuthor.textContent = `by ${book.author}`
        showPages.textContent = `${book.pages} pages`;
        if (book.read == false) showRead.textContent = 'not read yet';
        else showRead.textContent = 'read';
        
        showBook.appendChild(showTitle);
        showBook.appendChild(showAuthor);
        showBook.appendChild(showPages);
        showBook.appendChild(showRead);
        bookContainer.appendChild(showBook);
    }
}

const dialog = document.querySelector('dialog');
const addBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const confirmBtn = document.querySelector('.confirm-btn');

const inputTitle = document.getElementById('title');
const inputAuthor = document.getElementById('author');
const inputPages = document.getElementById('pages');
const inputRead = document.getElementById('read');

addBtn.addEventListener('click', () => {
    dialog.showModal();
});

closeBtn.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.close();
});


confirmBtn.addEventListener('click', (event) => {
    //newBook = Book(inputTitle.value, inputAuthor.value, inputPages.value);
    event.preventDefault();
    const newBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value);

    if (newBook['title'] && newBook['author'] && newBook['pages']) {
        myLibrary.push(newBook);
        document.querySelector('form').reset();
        dialog.close();
        listBooks();
    }
})
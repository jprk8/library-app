const myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
    this.info = function() {
        infoString = `${this.title} by ${this.author}, ${this.pages} pages, `;
        if (this.read) return infoString += "read";
        else return infoString += "not read yet";
    }
}

const ender = new Book(`Ender's Game`, 'Orson Scott Card', 324);
const morrie = new Book('Tuesdays with Morrie', 'Mitch Albom', 192);
myLibrary.push(ender);
myLibrary.push(morrie);

for (const book of myLibrary) {
    const bookContainer = document.querySelector('.book-container');
    const showBook = document.createElement('div');
    const showTitle = document.createElement('div');
    const showAuthor = document.createElement('div');
    const showPages = document.createElement('div');
    const showRead = document.createElement('div');
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
const addBookBtn = document.querySelector(".add-book-btn");
const newBookForm = document.querySelector("#new-book-form");

addBookBtn.addEventListener("click", (e) => {
    const currentFormDisplay = getComputedStyle(newBookForm).getPropertyValue("display");
    if (currentFormDisplay === "none") {
        newBookForm.style.display = "block";
        addBookBtn.classList.add("add-book-btn-collapsed");
    } else {
        newBookForm.style.display = "none";
        addBookBtn.classList.remove("add-book-btn-collapsed");
    }
});

const booksContainer = document.querySelector(".books-container");


function Library() {
    this.books = [];
};

Library.prototype.addBook = function(book) {
    this.books.push(book);
};

Library.prototype.displayBooks = function() {
    this.books.forEach(book => {
        const bookCard = book.createDomCard();
        booksContainer.appendChild(bookCard);
    });
};

function Book(title, author, pages, imageUrl, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.imageUrl = imageUrl;
    this.read = read;
}

Book.prototype.createDomCard = function() {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookImage = document.createElement("img");
    bookImage.src = this.imageUrl;
    bookImage.alt = `Book: ${this.title}`;
    bookImage.classList.add("book-image");

    const bookTitle = document.createElement("p");
    bookTitle.textContent = this.title;
    bookTitle.classList.add("book-title");

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = this.author;
    bookAuthor.classList.add("book-author");

    const pagesNumber = document.createElement("p");
    pagesNumber.textContent = this.pages;

    const bookReadBtn = document.createElement("button");
    bookReadBtn.textContent = this.read ? "Book read" : "Book not read yet";
    bookReadBtn.classList.add("book-read-btn");

    bookCard.appendChild(bookImage);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(pagesNumber);
    bookCard.appendChild(bookReadBtn);

    return bookCard;
};

const theHobbitBook = new Book(
    "The Hobbit",
    "J.R.R. Tolkien",
    295,
    "https://static3planetadelibroscommx.cdnstatics.com/usuaris/libros/fotos/173/m_libros/172408_portada_el-hobbit_j-r-r-tolkien_201505211341.jpg",
    false
);

const allTheLightBook = new Book(
    "All the Light We Cannot See",
    "Anthony Doerr",
    544,
    "https://m.media-amazon.com/images/I/51D5+B0e8hL._SY344_BO1,204,203,200_.jpg",
    false
);

const talesOfJapanBook = new Book(
    "Tales of Japan: Traditional Stories of Monsters and Magic",
    "Chronicle Books",
    168,
    "https://m.media-amazon.com/images/P/B07SGG6JGK.01._SCLZZZZZZZ_SX500_.jpg"
);

const myLibrary = new Library();

myLibrary.addBook(theHobbitBook);
myLibrary.addBook(allTheLightBook);
myLibrary.addBook(talesOfJapanBook);

myLibrary.displayBooks();
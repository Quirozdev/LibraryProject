const displayBookFormBtn = document.querySelector(".display-book-form-btn");
const newBookForm = document.querySelector("#new-book-form");
const addBookBtn = document.querySelector("#add-book-btn");



const booksContainer = document.querySelector(".books-container");


function Library() {
    this.books = [];
};

Library.prototype.addBook = function(book) {
    this.books.push(book);
};

Library.prototype.displayBooks = function() {
    // to avoid that the container repeat its children
    booksContainer.replaceChildren();
    this.books.forEach((book, index) => {
        const bookCard = book.createDomCard(index);
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

Book.prototype.toggleReadStatus = function() {
    this.read = !this.read;
};

Book.prototype.createDomCard = function(index) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    // data-attribute represents the index of the book in the array of books of the Library object
    bookCard.setAttribute("data-attribute", index);

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

    bookReadBtn.addEventListener("click", (e) => {
        const bookIndex = Number(e.target.parentElement.getAttribute("data-attribute"));
        const book = myLibrary.books[bookIndex];
        // toggle read status, invert message
        book.toggleReadStatus();
        bookReadBtn.textContent = book.read ? "Book read" : "Book not read yet";
    });

    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.textContent = "Delete";
    deleteBookBtn.setAttribute("data-attribute", index);
    deleteBookBtn.classList.add("delete-book-btn");

    deleteBookBtn.addEventListener("click", (e) => {
        const bookIndex = Number(e.target.parentElement.getAttribute("data-attribute"));
        myLibrary.books.splice(bookIndex, 1);
        myLibrary.displayBooks();
    })


    bookCard.appendChild(bookImage);
    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(pagesNumber);
    bookCard.appendChild(bookReadBtn);
    bookCard.appendChild(deleteBookBtn)

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
    "https://m.media-amazon.com/images/P/B07SGG6JGK.01._SCLZZZZZZZ_SX500_.jpg",
    true
);


const myLibrary = new Library();

myLibrary.addBook(theHobbitBook);
myLibrary.addBook(allTheLightBook);
myLibrary.addBook(talesOfJapanBook);

myLibrary.displayBooks();


displayBookFormBtn.addEventListener("click", (e) => {
    const currentFormDisplay = getComputedStyle(newBookForm).getPropertyValue("display");
    if (currentFormDisplay === "none") {
        newBookForm.classList.remove("hidden");
        displayBookFormBtn.classList.add("display-book-form-btn-collapsed");
    } else {
        newBookForm.classList.add("hidden");
        displayBookFormBtn.classList.remove("display-book-form-btn-collapsed");
    }
});

newBookForm.addEventListener("submit", (e) => {
    // to avoid page reload
    e.preventDefault();
    const formData = new FormData(newBookForm);
    const bookRead = formData.get("read") === "yes";
    const newBook = new Book(
        formData.get("title"),
        formData.get("author"),
        formData.get("pages"),
        formData.get("image-url"),
        bookRead
    );

    myLibrary.addBook(newBook);
    myLibrary.displayBooks();
    
    // to clear the form inputs after the new book is added
    newBookForm.reset();
});
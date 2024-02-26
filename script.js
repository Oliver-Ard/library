// --HTML Elements--
// Modal
const formModal = document.querySelector(".form-modal");
const openModalBtn = document.querySelector(".library-ledger .new-book-btn");
const closeModalBtn = document.querySelector(".library-ledger .close-btn");
// Form
const libraryForm = formModal.querySelector(".library-form");
const titleInput = libraryForm.querySelector("#title");
const authorInput = libraryForm.querySelector("#author");
const pagesInput = libraryForm.querySelector("#pages");
const statusInput = libraryForm.querySelectorAll("input[name='status']");
// Library
const booksNrEl = document.querySelector(".library-ledger .books-number");
const library = document.querySelector("#library");

// --App Logic--
const myLibrary = [
	{ title: "Maus", author: "Art Spiegelman", pages: "225", status: "read" },
	{
		title: "Ugly love",
		author: "Collen Hoover",
		pages: "352",
		status: "not read yet",
	},
];

function Book(title, author, pages, status) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.status = status;
}

function addBookToLibrary() {
	let bookStatus = "";
	statusInput.forEach((statusBtn) => {
		if (statusBtn.checked) {
			return (bookStatus = statusBtn.value);
		}
	});

	const newBook = new Book(
		titleInput.value,
		authorInput.value,
		pagesInput.value,
		bookStatus
	);

	myLibrary.push(newBook);
	displayBook();
	countBooks();
	clearForm();
}

function displayBook() {
	library.textContent = "";

	for (let book of myLibrary) {
		// Card Element
		const bookCard = document.createElement("div");
		bookCard.classList.add("library-book-card");
		// Heading Element with the number of the book
		const bookNr = document.createElement("h2");
		bookNr.textContent = "#";
		const bookNrSpan = document.createElement("span");
		bookNrSpan.textContent = `${myLibrary.indexOf(book) + 1}`;
		bookNr.append(bookNrSpan);
		bookCard.append(bookNr);
		// List Info
		const bookListInfo = document.createElement("ul");
		bookCard.append(bookListInfo);
		// Title Info
		const bookTitle = document.createElement("li");
		const bookTitleSpan = document.createElement("span");
		bookTitleSpan.textContent = "Title";
		bookTitle.append(bookTitleSpan);
		const bookTitleText = document.createTextNode(`: "${book.title}"`);
		bookTitle.append(bookTitleText);
		bookListInfo.append(bookTitle);
		// Author Info
		const bookAuthor = document.createElement("li");
		const bookAuthorSpan = document.createElement("span");
		bookAuthorSpan.textContent = "Author";
		bookAuthor.append(bookAuthorSpan);
		const bookAuthorText = document.createTextNode(`: ${book.author}`);
		bookAuthor.append(bookAuthorText);
		bookListInfo.append(bookAuthor);
		// Pages Info
		const bookPages = document.createElement("li");
		const bookPagesSpan = document.createElement("span");
		bookPagesSpan.textContent = "Pages";
		bookPages.append(bookPagesSpan);
		const bookPagesText = document.createTextNode(`: ${book.pages}`);
		bookPages.append(bookPagesText);
		bookListInfo.append(bookPages);
		// Status Info
		const bookStatus = document.createElement("li");
		const bookStatusSpan = document.createElement("span");
		bookStatusSpan.textContent = "Status";
		bookStatus.append(bookStatusSpan);
		const bookStatusText = document.createTextNode(`: ${book.status}`);
		bookStatus.append(bookStatusText);
		const bookStatusIconBtn = document.createElement("i");
		bookStatusIconBtn.classList.add(
			"fa-solid",
			"fa-arrows-rotate",
			"status-icon"
		);
		bookStatus.append(bookStatusIconBtn);
		bookListInfo.append(bookStatus);
		// Delete Button
		const bookDeleteBtn = document.createElement("i");
		bookDeleteBtn.classList.add("fa-solid", "fa-trash", "trash-icon");
		bookCard.append(bookDeleteBtn);

		library.append(bookCard);
	}
}

function countBooks() {
	booksNrEl.childNodes[1].textContent = `: ${myLibrary.length}`;
}

// --Helper Functions--
function clearForm() {
	libraryForm.reset();
}

function init() {
	countBooks();
	displayBook();
}
// --Event Listeners--
libraryForm.addEventListener("submit", addBookToLibrary);

window.addEventListener("DOMContentLoaded", init);

openModalBtn.addEventListener("click", () => {
	formModal.showModal();
});

closeModalBtn.addEventListener("click", () => {
	formModal.setAttribute("closing", "");
	formModal.addEventListener(
		"animationend",
		() => {
			formModal.removeAttribute("closing");
			formModal.close();
		},
		{ once: true }
	);
});

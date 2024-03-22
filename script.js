class Book {
	constructor(title, author, pages, status) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.status = status;
	}

	toggleStatus() {
		if (this.status === "read") {
			return (this.status = "not read yet");
		} else if (this.status === "not read yet") {
			return (this.status = "read");
		}
	}
}

class Storage {
	static getLibrary() {
		let library;
		const libraryData = localStorage.getItem("library");
		// Check if the library already exists in local storage
		if (!libraryData) {
			library = [
				new Book("Maus", "Art Spiegelman", 296, "read"),
				new Book(
					"The Strange Case of Dr Jekyll and Mr Hyde",
					"Robert Louis Stevenson",
					296,
					"not read yet"
				),
				new Book("Don Quixote", "Miguel de Cervantes", 544, "not read yet"),
			];
			Storage.saveLibrary(library);
		} else {
			const libraryObj = JSON.parse(libraryData);
			// Reconstruct the array instances
			library = [];
			libraryObj.forEach((item) => {
				const book = new Book(item.title, item.author, item.pages, item.status);

				library.push(book);
			});
		}
		return library;
	}

	static saveLibrary(library) {
		localStorage.setItem("library", JSON.stringify(library));
	}
}

class App {
	#formModal;
	#openModalBtn;
	#closeModalBtn;
	#libraryForm;
	#titleInput;
	#authorInput;
	#pagesInput;
	#statusInput;
	#booksNrEl;
	#library;

	constructor() {
		// --HTML Elements--
		// Modal
		this.#formModal = document.querySelector(".form-modal");
		this.#openModalBtn = document.querySelector(
			".library-ledger .new-book-btn"
		);
		this.#closeModalBtn = document.querySelector(".library-ledger .close-btn");
		// Form
		this.#libraryForm = this.#formModal.querySelector(".library-form");
		this.#titleInput = this.#libraryForm.querySelector("#title");
		this.#authorInput = this.#libraryForm.querySelector("#author");
		this.#pagesInput = this.#libraryForm.querySelector("#pages");
		this.#statusInput = this.#libraryForm.querySelectorAll(
			"input[name='status']"
		);
		// Library
		this.#booksNrEl = document.querySelector(".library-ledger .books-number");
		this.#library = document.querySelector("#library");

		this.myLibrary = Storage.getLibrary();

		this.#loadEventListeners();
	}

	#addBookToLibrary() {
		let bookStatus = "";
		this.#statusInput.forEach((statusBtn) => {
			if (statusBtn.checked) {
				return (bookStatus = statusBtn.value);
			}
		});

		const newBook = new Book(
			this.#titleInput.value,
			this.#authorInput.value,
			+this.#pagesInput.value,
			bookStatus
		);

		this.myLibrary.push(newBook);
		this.#displayBooks();
		this.#countBooks();
		this.#clearForm();

		Storage.saveLibrary(this.myLibrary);
	}

	#deleteBookFromLibrary(e) {
		if (e.target.className.includes("trash-icon")) {
			const bookIndex = e.target.parentNode.dataset.index;
			this.myLibrary.splice(bookIndex, 1);
		}
		this.#displayBooks();
		this.#countBooks();

		Storage.saveLibrary(this.myLibrary);
	}

	#displayBooks() {
		this.#library.textContent = "";

		for (let book of this.myLibrary) {
			// Card Element
			const bookCard = document.createElement("div");
			bookCard.classList.add("library-book-card");
			bookCard.setAttribute("data-index", `${this.myLibrary.indexOf(book)}`);
			// Heading Element with the number of the book
			const bookNr = document.createElement("h2");
			bookNr.textContent = "#";
			const bookNrSpan = document.createElement("span");
			bookNrSpan.textContent = `${this.myLibrary.indexOf(book) + 1}`;
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

			this.#library.append(bookCard);
		}
	}

	#toggleBookStatus(e) {
		if (e.target.className.includes("status-icon")) {
			const bookIndex = e.target.parentNode.parentNode.parentNode.dataset.index;
			this.myLibrary[bookIndex].toggleStatus();
		}
		this.#displayBooks();

		Storage.saveLibrary(this.myLibrary);
	}

	#countBooks() {
		this.#booksNrEl.childNodes[1].textContent = `: ${this.myLibrary.length}`;
	}

	// --Helper Functions--
	#clearForm() {
		this.#libraryForm.reset();
	}

	#openModal() {
		this.#formModal.showModal();
	}

	#closeModal() {
		this.#formModal.setAttribute("closing", "");

		this.#formModal.addEventListener(
			"animationend",
			() => {
				this.#formModal.removeAttribute("closing");
				this.#formModal.close();
			},
			{ once: true }
		);
	}

	#init() {
		this.#countBooks();
		this.#displayBooks();
	}

	#loadEventListeners() {
		window.addEventListener("DOMContentLoaded", this.#init.bind(this));
		this.#libraryForm.addEventListener(
			"submit",
			this.#addBookToLibrary.bind(this)
		);
		this.#library.addEventListener(
			"click",
			this.#deleteBookFromLibrary.bind(this)
		);
		this.#library.addEventListener("click", this.#toggleBookStatus.bind(this));

		this.#openModalBtn.addEventListener("click", this.#openModal.bind(this));
		this.#closeModalBtn.addEventListener("click", this.#closeModal.bind(this));
	}
}

const append = new App();

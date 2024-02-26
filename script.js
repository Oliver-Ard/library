// ----HTML Elements----
// Modal
const formModal = document.querySelector(".form-modal");
const openModalBtn = document.querySelector(".library-ledger .new-book-btn");
const closeModalBtn = document.querySelector(".library-ledger .close-btn");
// Form
const libraryForm = formModal.querySelector(".library-form");
const input = libraryForm.querySelector("input");

libraryForm.addEventListener("submit", () => {
	title.textContent = input.value;
});

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

const settings = {
	mode: true,
	info: false,
	selected: null,

	getBoxes: () => document.querySelectorAll(".box"),
};

const boxStack = [];

const mainS = document.querySelectorAll("main");
const main = mainS[0];

const tab_buttons = document.querySelectorAll("#tabs > button");
const [paste, select, delete_selected, source] =
	document.querySelectorAll("#menu > button");

settings.selected = 0;

tab_buttons.forEach((button, index) =>
	button.addEventListener("click", (e) => tabFunc(e, index))
);

delete_selected.addEventListener("click", deleteSelected);

function tabFunc(_, index) {
	if (index === settings.selected) {
		return tabFunc(_, 0);
	}

	const selected = tab_buttons[settings.selected];

	selected.classList.toggle("selected");
	tab_buttons[index].classList.toggle("selected");

	mainS[index].classList.toggle("main-hide");
	mainS[settings.selected].classList.toggle("main-hide");

	settings.selected = index;
}

document.onpaste = addPasted;

const addNode = (title, content) => {
	// <section class="box">
	// 	<div class="handle">
	// 		<i class="fa-solid fa-burger"></i>
	// 	</div>
	// 	<div class="type"></div>
	// 	<div class="content"></div>
	// 	<div class="selection-slider"></div>
	// </section>;

	const box = document.createElement("section");
	box.classList.add("box");

	const handle = document.createElement("div");
	handle.classList.add("handle");

	handle.innerHTML = `<i class="fa-solid fa-grip-lines-vertical"></i>`;

	const type = document.createElement("div");
	type.className = "type";

	const content_ = document.createElement("div");
	content_.className = "content";
	content_.innerHTML = Math.random(0) * 100;

	const selection_slider = document.createElement("div");
	selection_slider.className = "selection-slider";

	box.append(handle, type, content_, selection_slider);
	main.append(box);

	selection_slider.addEventListener("click", selectBox);
	content_.addEventListener("click", () => {
		showInfo(false);
		// setDetails();
	});

	box.style.opacity = 0;
	setTimeout(() => (box.style.opacity = 1), 10);
};

function addPasted() {
	settings.selected === 0 ? addNode("test1", "internal content") : "";
}

function selectBox(event, isSource = false) {
	const source = isSource
		? event.querySelector(".selection-slider")
		: event.srcElement;

	const shake = source.parentElement.classList;

	source.classList.toggle("selected-slider");
	shake.toggle("shake");
}

function deleteSelected() {
	settings.getBoxes().forEach((box) => {
		const isSelected = box.classList.contains("shake");
		if (isSelected) {
			box.classList.remove("shake");
			box.classList.add("bye");

			setTimeout(() => box.remove(), 1350);
		} else {
			box.classList.add("roam");
			setTimeout(() => box.classList.remove("roam"), 1350);
		}
	});
}

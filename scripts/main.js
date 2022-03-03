const settings = {
	mode: false,
	info: false,

	personal: {
		animate: false,
	},

	getBoxes: () => document.querySelectorAll(".box"),
};

const boxStack = [];

const main = document.querySelector("main");
const settings_model = document.querySelector("footer > article:first-child");
const info_model = document.querySelector("footer > article:last-child");
const play = document.querySelector("header > button:first-of-type");
const paste = document.querySelector("header > button:nth-of-type(2)");
const select = document.querySelector("header > button:nth-of-type(3)");
const info = document.querySelector("header > button:nth-of-type(4)");
const trash = document.querySelector("header > button:nth-of-type(5)");
const sliders = document.querySelector("header > button:nth-of-type(6)");
const github = document.querySelector("header > button:last-of-type");

document.onpaste = addPasted;
const showInfo = (toggle) =>
	toggle
		? info_model.classList.toggle("show")
		: info_model.classList.add("show");

const toggleSettings = () => settings_model.classList.toggle("show");

paste.addEventListener("click", addPasted);
play.addEventListener("click", () => changeModeForBoxes());
trash.addEventListener("click", deleteSelected);
sliders.addEventListener("click", toggleSettings);
select.addEventListener("click", () =>
	settings.getBoxes().forEach((box) => selectBox(box, true))
);
info.addEventListener("click", showInfo);

document
	.querySelector("footer > article:first-child  button")
	.addEventListener("click", toggleSettings);

document
	.querySelector("footer > article:last-child button")
	.addEventListener("click", showInfo);

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
	addNode("test1", "internal content");
}

function changeModeForBoxes(mode) {
	settings.mode = !settings.mode;

	settings.getBoxes().forEach((box) => {
		const handle = box.querySelector(".handle");
		const icon = handle.querySelector("i");

		settings.mode ? "fa-solid fa-minus" : "fa-solid fa-grip-vertical";
		box.classList.toggle("float");
	});
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

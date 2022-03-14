// const peer = new Peer();

// console.log(peer);

// peer.on("connection", function (conn) {
// 	console.log(conn);
// });

// (function(){
// 	const
// })

// (function () {
// 	function generateID() {}

// 	const params = Object.fromEntries(
// 		window.location.search
// 			.substring(1)
// 			.split("&")
// 			.map((value) => value.split("="))
// 	);

// 	console.log(params);
// 	generateID();
// })();

$(".notify").click(function (e) {
	let target = e.target;

	if (target.tagName === "I") target = target.parentElement;

	const box = $(
		`<span class='notify' style='display:none;'>${target.dataset.tip}</span>`
	);

	$("body").append(box);
	box.fadeIn();
	setTimeout(() => box.fadeOut(), 1000);
});

$(window).on("beforeunload", function () {
	return "Are you sure you want to leave?";
});

function toggleOverlay(e, confirm_close = true) {
	const sheet = $("article.overlay-sheet");
	if (
		!e.target.classList.contains(sheet.attr("class")) ||
		(sheet.css("display") == "none" && confirm_close)
	) {
		return;
	}

	$(".body").css(
		"filter",
		`blur(${sheet.css("display") === "none" ? 2.9 : 0}px)`
	);
	sheet.fadeToggle();
	$(".overlay").fadeToggle();
}

// $("button[title='QR Code']").click(toggleOverlay);
$(".overlay > header > button").click(toggleOverlay);
$(".overlay-sheet").click(toggleOverlay);

const settings = {
	mode: true,
	info: false,
	selected: document.querySelector("#tabs>button"),

	getBoxes: () => document.querySelectorAll(".box"),
};

$(window).on("paste", function () {
	// <section class="box">
	// 	<div class="handle">
	// 		<i class="fa-solid fa-burger"></i>
	// 	</div>
	// 	<div class="content"></div>
	// 	<div class="selection-slider"></div>
	// </section>;

	const box = $("<section class='box'></section>");
	const handle = $("<div class='handle'></div>");
	const content = $("<div class='content'></div>");
	box.append(handle, content);

	handle.append(`<i class="fa-solid fa-grip-lines-vertical"></i>`);
	content.click(toggleOverlay);

	$("main").append(box);
});

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

const DECKS = {
	prvi_dek: [
		"https://picsum.photos/300",
		"https://picsum.photos/200",
		"https://picsum.photos/200",
		"https://picsum.photos/200",
	],
	drugi_dek: [
		"https://picsum.photos/200",
		"https://picsum.photos/200",
		"https://picsum.photos/200",
		"https://picsum.photos/200",
	],
};


function tab_setup() {
	let window_hash = window.location.hash;
	if (!window_hash) window_hash = "#nav-decks";

	const clicked_tab = document.querySelector(`[href='${window_hash}']`);

	document.querySelectorAll(".nav-link").forEach((element) => {
		if (clicked_tab === element) {
			element.classList.add("active");
		} else {
			element.classList.remove("active");
		}
	});

	document.querySelectorAll(".tab-container").forEach((element) => {
		if (element.getAttribute("data-hash") === window_hash) {
			element.classList.remove("d-none");
		} else {
			element.classList.add("d-none");
		}
	});
}

function select_deck(event) {
	const clicked_link = event.target;

	if (clicked_link.classList.contains("active")) {
		clicked_link.classList.remove("active");
	} else {
		clicked_link.classList.add("active");
	}

	const selected_cards = [];
	document.querySelectorAll(".list-group-item.active").forEach((element) => {
		selected_cards.push(...DECKS[element.innerHTML]);
	});

	build_cards(selected_cards);
}


function build_cards(selected_cards) {
	const cards_container = document.querySelector(".container-cards");
	const template_hexagon = document.querySelector("#hex-template");

	Array.from(cards_container.querySelectorAll(".hex:not(.first)"))
		.slice(1)
		.forEach(element => {
			element.remove()
		});

	selected_cards.forEach((card_url) => {
		const hexagon = template_hexagon.content.cloneNode(true).firstChild;
		hexagon.addEventListener("click", () => {
			cards_container.dispatchEvent(
				new CustomEvent("cardSelect", {detail: {image_url: card_url}})
			);
		})

		hexagon.style.backgroundImage = `url("${card_url}")`;
		cards_container.appendChild(hexagon);
	});
}


function setup_decks() {
	const deck_list_template = document.querySelector("#deck-list-template");
	const deck_list = document.querySelector(".container-decks");

	Object.keys(DECKS).forEach((deck_name) => {
		const new_deck_list_item = deck_list_template.content.cloneNode(true)
			.firstChild;

		new_deck_list_item.innerHTML = deck_name;
		deck_list.appendChild(new_deck_list_item);
	});

	const list_group_links = document.querySelectorAll(
		".list-group.tab-container>div"
	);

	list_group_links.forEach((element) => {
		element.addEventListener("click", select_deck);
	});
}

exports.setup_decks = setup_decks;
exports.tab_setup = tab_setup;

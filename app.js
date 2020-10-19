const { setup_decks, tab_setup } = require("./scripts/navbar");
const { generate_grid, fill_hexagon, grid_state, empty_hexagon } = require("./scripts/grid");

const DEFAULT_HEX_WIDTH = 240;
const DEFAULT_HEX_HEIGHT = 265;
const DEFAULT_GRID_AUTO_ROWS = 200;


function zoom_grid(scale) {
	const hexes = document.querySelectorAll(".hex-container>.hex");
	hexes.forEach((hex) => {
		hex.style.width = `${DEFAULT_HEX_WIDTH * scale}px`;
		hex.style.height = `${DEFAULT_HEX_HEIGHT * scale}px`;
	});

	const grid_container = document.querySelector(".hex-container");
	grid_container.style.gridAutoRows = `${DEFAULT_GRID_AUTO_ROWS * scale}px`;
}


document.querySelector(".container-cards").addEventListener("cardSelect", (event) =>
{
	const image_url = event.detail.image_url;
	fill_hexagon(image_url);

});

generate_grid();
tab_setup();
setup_decks();
grid_state.restore();
window.addEventListener("hashchange", tab_setup);
window.addEventListener("beforeunload", () => grid_state.store());
document.querySelector(".scale-select")
	.addEventListener("change", event => {
		const scale_size = Number(event.target.value);
		console.log(scale_size);
		zoom_grid(scale_size);
	});
document.querySelector(".hex-delete")
	.addEventListener("click", () => {
		empty_hexagon();
	});
document.querySelector(".cards-tools>button")
	.addEventListener("click", () => {
		grid_state.clear();
		location.reload();
	});

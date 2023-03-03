/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
	daisyui: {
		themes: ["light"],
	},
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [import("daisyui")],
};

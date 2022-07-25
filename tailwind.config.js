module.exports = {
	content: ['./public/**/*.html', './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary-0': '#ffffff', //matching dark and normal color # are at least 5 contrast ratio
				'primary-1': '#D9D9D9',
				'primary-2': '#A1A5A6',
				'primary-dark-0': '#5F6E73',
				'primary-dark-1': '#4A5559',
				'primary-dark-2': '#2A3133',
				'secondary-0': '#B0FFFF',
				'secondary-1': '#96D4E0',
				'secondary-2': '#71A1AB',
				'secondary-dark-0': '#394D59',
				'accent-1-0': '#FF9E80', //these aren't guaranteed to have any contrast ratio
				'accent-1-1': '#FF6E40',
				'accent-1-2': '#FF5722',
				'accent-1-3': '#FF3D00',
				'accent-1-dark': '#DD2C00'
			},
			fontFamily: {
				monospace: ['Fira Code', 'monospace']
			}
		}
	},
	plugins: []
};

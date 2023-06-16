type Breakpoints = {
	s: number;
	m: number;
	l: number;
};

type Theme = {
	white: string;
	black: string;
	gray: string;
	accent: string;
	strong: string;
	complementary: string;
	breakpoints: Breakpoints;
};

export const theme: Theme = {
	white: '#fdfdfd',
	black: '#151515',
	gray: '#ccc',
	accent: 'rgb(0 69 255 / 7%)',
	strong: '#5274fd',
	complementary: 'rgb(141 141 141 / 27%)',
	breakpoints: {
		s: 500,
		m: 760,
		l: 960,
	},
};

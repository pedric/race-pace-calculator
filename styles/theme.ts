type Breakpoints = {
	s: number;
	m: number;
	l: number;
};

type Theme = {
	white: string;
	black: string;
	gray: string;
	dark: string;
	accent: string;
	strong: string;
	cta: string;
	complementary: string;
	breakpoints: Breakpoints;
};

export const theme: Theme = {
	white: '#fdfdfd',
	black: '#151515',
	gray: '#D5D5D5',
	dark: '#333',
	accent: 'rgb(0 69 255 / 7%)',
	strong: '#DE5E00',
	cta: '#e54f6b',
	complementary: 'rgba(80,80,80,1)',
	breakpoints: {
		s: 500,
		m: 760,
		l: 960,
	},
};

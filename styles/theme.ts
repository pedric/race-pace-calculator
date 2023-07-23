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
	gradient: string;
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
	// cta: '#e54f6b',
	cta: '#02a354',
	gradient: 'linear-gradient(45deg, #e54f6b, #e54fe469)',
	complementary: 'rgba(80,80,80,1)',
	breakpoints: {
		s: 500,
		m: 760,
		l: 960,
	},
};

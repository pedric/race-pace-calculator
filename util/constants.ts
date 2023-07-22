import { Breakpoints } from '../types';

export enum UNIT {
	H = 'H',
	M = 'M',
	S = 'S',
}

export enum MODE {
	METRIC = 'METRIC',
	IMPERIAL = 'IMPERIAL',
}

export enum INPUT {
	SELECT = 'SELECT',
	FREE = 'FREE',
}

export const breakpoints: Breakpoints = {
	s: 500,
	m: 760,
	l: 1024,
};

export enum MONITOR {
	BUBBLE = 1,
	BOX = 2,
}

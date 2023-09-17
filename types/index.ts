export type PaceData = {
	hours: number;
	minutes: number;
	seconds: number;
	distance: number;
	raceName: string;
};

export type Pace = {
	minutes: number;
	seconds: number;
};
export type Breakpoints = {
	s: 500;
	m: 760;
	l: 1024;
};

export type PaceEditorState = {
	metricPace: Pace;
	imperialPace: Pace;
};

// Training plan types
export type TypeSessionSplit = {
	name: string;
	distance: number;
	minutes: number;
	unit: string;
	intensity: string;
};

export type TypeSession = {
	name: string;
	splits: TypeSessionSplit[];
};

export type TypeDay = {
	name: string;
	sessions: TypeSession[];
	done: boolean;
};

export type TypeWeek = {
	name: string;
	days: TypeDay[];
};

export type TypePeriod = {
	length: number;
	name: string;
	plan: TypeWeek[];
};

export interface TypeTrainingPlanState {
	name: string;
	periods: TypePeriod[];
}

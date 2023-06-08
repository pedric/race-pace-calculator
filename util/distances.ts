export interface Distance {
	name: string;
	distance: number;
}

const distances: Distance[] = [
	{ name: 'Pick a distance', distance: 0 },
	{ name: '100m', distance: 100 },
	{ name: '200m', distance: 200 },
	{ name: '800m', distance: 800 },
	{ name: '1,5 km', distance: 1500 },
	{ name: '1 mile', distance: 1609.34 },
	{ name: '3 km', distance: 3000 },
	{ name: '5 km', distance: 5000 },
	{ name: '10 km', distance: 10000 },
	{ name: 'Half marathon', distance: 21097 },
	{ name: 'Marathon', distance: 42195 },
	{ name: '50 miles', distance: 80467.2 },
	{ name: '100 miles', distance: 160934.3 },
];

export default distances;

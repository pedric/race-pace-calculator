import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { TrainingPlanProvider } from '../context/traininplan/TrainingPlanContext';

function App({ Component, pageProps }: AppProps) {
	return (
		<TrainingPlanProvider>
			<Component {...pageProps} />
		</TrainingPlanProvider>
	);
}

export default App;

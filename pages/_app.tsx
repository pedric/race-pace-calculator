import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { TrainingPlanProvider } from '../context/traininplan/TrainingPlanContext';
import DragAndDropcontext from '../context/traininplan/DragAndDropcontext';

function App({ Component, pageProps }: AppProps) {
	return (
		<TrainingPlanProvider>
			<DragAndDropcontext>
				<Component {...pageProps} />
			</DragAndDropcontext>
		</TrainingPlanProvider>
	);
}

export default App;

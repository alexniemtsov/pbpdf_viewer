import './App.css';
import { LibraryPage } from './pages/LibraryPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ReaderPage } from './pages/ReaderPage';

function App() {

	return (<BrowserRouter>
		<Routes>
			<Route path="/" element={<LibraryPage />} />
			<Route path="/book/:id" element={<ReaderPage />} />
		</Routes>

	</BrowserRouter>);
}

export default App;

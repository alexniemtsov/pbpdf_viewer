import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchLibrary } from '../state/librarySlice';
import { type RootState, useAppDispatch } from '../state/store';
import { Link } from 'react-router-dom';
import { BookCard } from '../components/BookCard';

export function LibraryPage() {
	const dispatch = useAppDispatch();

	const { items, status, error } = useSelector((s: RootState) => s.library);



	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchLibrary());
		}
	}, [status, dispatch]);

	console.log('items', items);

	if (status === 'loading') return <p>Loading...</p>;

	if (status === 'error') return <p>Error {error}</p>;

	// if (status === 'success') {
	//
	// }

	return (
		<div className="library-grid">
			{items.map((book) => (
				<Link key={book.id} to={`/book/${book.id}`}>
					<BookCard book={book} />
				</Link>
			))}
		</div>

	);
}

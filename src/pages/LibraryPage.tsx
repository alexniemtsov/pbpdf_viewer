import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchLibrary } from '../state/librarySlice';
import { type RootState, useAppDispatch } from '../state/store';

export function LibraryPage() {
	const dispatch = useAppDispatch();

	const { items, status, error } = useSelector((s: RootState) => s.library);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchLibrary());
		}
	}, [status, dispatch]);

	if (status === 'loading') return <p>Loading...</p>;

	if (status === 'error') return <p>Error {error}</p>;
}

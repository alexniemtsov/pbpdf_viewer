import { useEffect } from "react";
import { useAppDispatch } from "../state/store";
import type { BookMeta } from "../state/librarySlice";


interface BookCardData {
	book: BookMeta
}

export function BookCard({ book }: BookCardData) {
	// todo: fetch image here.
	const dispatch = useAppDispatch();
	console.log('BookCard(book)', book);

	useEffect(() => {
	}, [book, dispatch])

	return (
		<div>
			<h2>{book.name}</h2>
			<h3>{book.author.name}</h3>
			<h3>{book.pages}</h3> <span>{book.id}</span>
		</div>
	);
}

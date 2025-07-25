import { useParams } from "react-router-dom";
import { useAppDispatch } from "../state/store";
import { openBook } from "../state/readerSlice";
import { useEffect } from "react";
import { PDFViewer } from "../components/PDFViewer";



export function ReaderPage() {

	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();

	// todo: fetch pdf file here
	useEffect(() => {
		if (id) {
			dispatch(openBook(id));
		}
	}, [id, dispatch]);

	if (!id) {
		return <p>Book not found</p>;
	}
	return <PDFViewer bookId={id} />;
}

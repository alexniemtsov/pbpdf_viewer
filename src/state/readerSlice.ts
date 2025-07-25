import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface ReaderState {
	bookId: string | null,
	progress: BookProgress,
	opts: ReaderOptions,
}

interface BookProgress {
	page: number,
	offset: number,
}

interface ReaderOptions {
	fontSize: number,
	fontType: string | null, // null keeps original book's font
	zoom: number,
}

const readerSlice = createSlice({
	name: 'reader',
	initialState: {
		bookId: null,
		progress: {
			page: 1,
			offset: 0
		},
		opts: {
			fontSize: 14,
			fontType: null,
			zoom: 1
		}
	} as ReaderState,
	reducers: {
		openBook: (state, action: PayloadAction<string>) => {
			state.bookId = action.payload;
			state.progress.page = 1;
		},
		setPage: (state, action: PayloadAction<number>) => {
			state.progress.page = action.payload;
		},
		setZoom: (state, action: PayloadAction<number>) => {
			state.opts.zoom = action.payload;
		},
		setFontSize: (state, action: PayloadAction<number>) => {
			state.opts.fontSize = action.payload;
		},
		setFontType: (state, action: PayloadAction<string>) => {
			state.opts.fontType = action.payload;
		},
	}
});


export const { openBook, setPage, setZoom, setFontSize, setFontType } = readerSlice.actions;
export const readerReducer = readerSlice.reducer;


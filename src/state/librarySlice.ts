import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { libraryService } from "../services/libraryService";

interface LibraryState {
	items: BookMeta[],
	status: 'idle' | 'loading' | 'success' | 'error',

	error: string | null
}

export interface BookMeta {
	name: string,
	pages: BookProgress
}

interface BookProgress {
	total: number,
	current: number
}


export const fetchLibrary = createAsyncThunk(
	'library/fetchBooks',
	async (_, { rejectWithValue }) => {
		try {
			return await libraryService.fetchAll();

		} catch (err) {
			return rejectWithValue(err);

		}

	}

);

const librarySlice = createSlice({
	name: 'library',
	initialState: {
		items: [],
		status: 'idle',

		error: null
	} as LibraryState,
	reducers: {
		// fetchBooksPending: (state) => {
		// 	state.status = 'loading'
		// },
		// fetchBooksFulfilled: (state) => {
		// 	state.status = 'idle'
		// }
	},
	extraReducers(builder) {
		builder.addCase(fetchLibrary.pending, (state) => {
			state.status = 'loading';
			state.error = null;
		});
		builder.addCase(fetchLibrary.fulfilled, (state, action: PayloadAction<BookMeta[]>) => {
			state.status = 'success';
			state.items = action.payload;
			state.error = null;


		});
		builder.addCase(fetchLibrary.rejected, (state, action) => {
			state.status = 'error';
			state.error = action.payload as string || 'Failed to load books';
		});
	},
});



// export const { fetchBooksPending, fetchBooksFulfilled } = librarySlice.actions;
export const { } = librarySlice.actions;
export const libraryReducer = librarySlice.reducer;


// todo: add search/filter

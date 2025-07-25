import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { readerReducer } from './readerSlice';
import { libraryReducer } from './librarySlice';
import { useDispatch } from 'react-redux';


const persistConfig = {
	key: 'pbpdf:1',
	storage,
	whitelist: ['reader'],
};

export const store = configureStore({
	reducer: {
		library: libraryReducer,
		reader: persistReducer(persistConfig, readerReducer),
	},
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

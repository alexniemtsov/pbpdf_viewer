import axios from "axios";
import type { BookMeta } from "../state/librarySlice";


export const libraryService = {
	fetchAll: async (): Promise<BookMeta[]> => {
		const resp = await axios.get<BookMeta[]>('/lib.json');
		return resp.data;
	}
};

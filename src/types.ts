export type ProviderSource = string | null;

export interface GelbooruPost {
	id: number;
	md5: string;
  width: number;
  height: number;
	owner: string;
	rating: string;
	source: string;
	tags: string;
	file_url: string;
}

export interface GelbooruData {
	post: GelbooruPost[];
}

export interface DanbooruPost {
	id: number;
	rating: string;
	source: string;
	tag_string: string;
	file_url: string;
}

export type DanbooruData = DanbooruPost[];

// FemboyData is the data structure returned by the API endpoint /api/:value
export interface FemboyData {
	error: boolean;
	error_message: string | null;
	query: string;
	url: {
		gelbooru: string; // if there is a response, the gelbooru url will always be present
		danbooru: ProviderSource;
	};
	tags: string;
	source: string;
	dimensions: string;
}

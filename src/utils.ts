import type { GelbooruPost } from "./types";

export function getDanbooruUrl(post: GelbooruPost): string | null {
	if (post.owner !== "danbooru") return null;

	const extension = post.file_url.split(".").pop();

	return `https://cdn.donmai.us/original/${post.md5.slice(0, 2)}/${post.md5.slice(2, 4)}/${post.md5}.${extension}`;
}

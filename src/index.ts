import cors from "cors";
import express from "express";
import type {
	GelbooruData,
	FemboyData,
	ProviderSource,
	Provider,
} from "./types";
import { getDanbooruUrl } from "./utils.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
	res.redirect("https://github.com/FireStreaker2/FemboyFinder");
});

// -------- femboyfinderbot stuff - remove if you want ---------
app.get("/invite", (req, res) => {
	res.redirect(
		"https://discord.com/oauth2/authorize?&client_id=1132490986736582736&scope=bot&permissions=274877908992",
	);
});

app.get("/privacypolicy", (req, res) => {
	res.redirect(
		"https://github.com/FireStreaker2/FemboyFinderBot/blob/main/privacypolicy.md",
	);
});
// --------------------------------------------------------------

app.get("/:value", async (req, res) => {
	let query = req.params.value;
	if (query === "favicon.ico") query = "astolfo";

	try {
		const response = await fetch(
			`${req.protocol}://${req.get("host")}/api/${query}`,
		);
		const data = (await response.json()) as FemboyData;
		const image = await fetch(data.url.gelbooru, {
			headers: {
				Referer: "https://gelbooru.com/",
			},
		});

		const buffer = await image.arrayBuffer();
		const mimeType = image.headers.get("content-type");

		res.setHeader("Content-Type", mimeType || "image/jpeg");
		res.send(Buffer.from(buffer));
	} catch (error) {
		console.error(error);
		res.status(500).send(`An error occurred: ${error}`);
	}
});

app.get("/api/:value", async (req, res) => {
	const query = req.params.value;
	const provider = req.query.provider as Provider;
	const api = `https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=100&tags=${query}&api_key=${process.env.API_KEY}&user_id=${process.env.USER_ID}`;

	const response = await fetch(api);
	if (!response.ok) {
		return res.status(response.status).json({
			error: true,
			error_message: `Failed to fetch data from Gelbooru API. Status: ${response.status}`,
			query,
			url: { danbooru: "", gelbooru: "" },
			tags: "",
			source: "",
			dimensions: "",
		} satisfies FemboyData);
	}

	const data = (await response.json()) as GelbooruData;
	if (!data.post || data.post.length === 0) {
		return res.status(404).json({
			error: true,
			error_message: "No posts found for this tag.",
			query,
			url: {
				danbooru: "",
				gelbooru: "",
			},
			tags: "",
			source: "",
			dimensions: "",
		} satisfies FemboyData);
	}

	// TODO: filter for other providers when supported
	let posts = data.post;
	if (provider === "danbooru")
		posts = posts.filter((post) => post.owner === "danbooru");

	if (posts.length === 0) {
		return res.status(404).json({
			error: true,
			error_message: `No posts found for provider: ${provider}`,
			query,
			url: {
				danbooru: "",
				gelbooru: "",
			},
			tags: "",
			source: "",
			dimensions: "",
		} satisfies FemboyData);
	}

	const index = Math.floor(Math.random() * posts.length);
	const post = posts[index];

	let danbooru: ProviderSource = null;

	if (post.owner == "danbooru") danbooru = getDanbooruUrl(post);

	res.json({
		error: false,
		error_message: null,
		query,
		url: {
			gelbooru: post.file_url,
			danbooru: danbooru,
		},
		tags: post.tags,
		source: post.source,
		dimensions: `${post.width}x${post.height}`,
	} satisfies FemboyData);
});

app.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});

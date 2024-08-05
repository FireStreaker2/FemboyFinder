import fetch from "node-fetch";
import cors from "cors";
import express from "express";

const app = express();
const port = Bun.env.PORT || 3000;

declare module "bun" {
	interface Env {
		PORT: string | number;
		API_KEY: string;
		USER_ID: string | number;
	}
}

interface Post {
	id: number;
	rating: string;
	source: string;
	tags: string;
	title: string;
	file_url: string;
}

interface GelbooruData {
	post: Post[];
}

interface FemboyData {
	error: boolean;
	query: string;
	url: string;
	dimensions: string;
}

app.use(cors());

app.get("/", (req, res) => {
	res.redirect("https://github.com/FireStreaker2/FemboyFinder");
});

// -------- femboyfinderbot stuff - remove if you want ---------
app.get("/invite", (req, res) => {
	res.redirect(
		"https://discord.com/oauth2/authorize?&client_id=1132490986736582736&scope=bot&permissions=274877908992"
	);
});

app.get("/privacypolicy", (req, res) => {
	res.redirect(
		"https://github.com/FireStreaker2/FemboyFinderBot/blob/main/privacypolicy.md"
	);
});
// --------------------------------------------------------------

app.get("/:value", async (req, res) => {
	let query = req.params.value;
	if (query === "favicon.ico") query = "astolfo";

	try {
		const response = await fetch(
			`${req.protocol}://${req.get("host")}/api/${query}`
		);
		const data = (await response.json()) as FemboyData;
		const image = await fetch(data.url);

		image.body?.pipe(res);
	} catch (error) {
		console.error(error);
		res.status(500).send(`An error occurred: ${error}`);
	}
});

app.get("/api/:value", async (req, res) => {
	const query = req.params.value;
	const api = `https://gelbooru.com/index.php?page=dapi&s=post&q=index&json=1&limit=100&tags=${query}&api_key=${Bun.env.API_KEY}&user_id=${Bun.env.USER_ID}`;

	const response = await fetch(api);
	if (!response.ok)
		return res.status(response.status).json({ error: true, query });

	const data = (await response.json()) as GelbooruData;
	if (!data.post || data.post.length <= 0)
		return res.status(404).json({ error: true, query });

	const index = Math.floor(Math.random() * data.post.length);
	const post = data.post[index];

	res.json({
		error: false,
		query,
		url: post.file_url,
		tags: post.tags,
		source: post.source,
		rating: post.rating,
		title: post.title,
	});
});

app.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});

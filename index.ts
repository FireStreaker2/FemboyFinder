import fetch from "node-fetch";
import cors from "cors";
import express from "express";

const app = express();
const port = Bun.env.PORT || 3000;

declare module "bun" {
	interface Env {
		PORT: string | number;
	}
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
	const query = req.params.value;

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
	const api = `https://danbooru.donmai.us/posts.json?tags=*${query}*`;

	const response = await fetch(api);
	if (!response.ok) return res.status(response.status).json({ error: true });

	const data = (await response.json()) as any;

	const originalUrls = [];
	const sizes = [];
	for (const object of data) {
		const mediaAsset = object.media_asset;
		const variants = mediaAsset.variants;

		for (const variant of variants) {
			if (variant.type === "original") {
				originalUrls.push(variant.url);
				sizes.push(`${variant.width}x${variant.height}`);
			}
		}
	}

	const index = Math.floor(Math.random() * originalUrls.length);
	const randomUrl = originalUrls[index];
	const dimensions = sizes[index];

	res.json({
		error: false,
		query,
		url: randomUrl,
		dimensions,
	});
});

app.listen(port, () => {
	console.log(`App is listening on port ${port}`);
});

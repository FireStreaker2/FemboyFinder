const axios = require("axios");

const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send(`<script>window.location.href = "https://github.com/FireStreaker2/FemboyFinder"</script>`);
});

app.get("/:value", (req, res) => {
    const query = req.params.value;
    const api = `https://betabooru.donmai.us/posts.json?tags=*${query}*`;

    axios.get(api)
        .then(response => {
            const data = response.data;

            var originalUrls = [];
            for (const object of data) {
                const mediaAsset = object.media_asset;
                const variants = mediaAsset.variants;

                for (const variant of variants) {
                    if (variant.type === "original") {
                        originalUrls.push(variant.url);
                    }
                }
            }

        const index = Math.floor(Math.random() * originalUrls.length);
        const randomUrl = originalUrls[index];

        // console.log(randomUrl) <- uncomment if you want to log stuff
            
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta name="description" content="Link: ${randomUrl}">
                <meta name="keywords" content="FireStreaker2" />
                <meta name=”copyright” content=”FireStreaker2”>
                <meta property="og:title" content="Femboy Finder" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://github.com/FireStreaker2/FemboyFinder" />
                <meta property="og:image" content="${randomUrl}" />
                <meta property="og:description" content="Femboy Finder" />
                <meta name="theme-color" content="#000000">
                <meta name="twitter:card" content="summary_large_image">
                    
                <title>Femboy Found!</title>
                <link rel="icon" type="image/x-icon" href="https://i.pinimg.com/736x/50/77/1f/50771f45b1c015cfbb8b0853ba7b8521.jpg" />
            </head>

            <body>
                <style>
                * {
                    margin: 0;
                }

                img {
                    width: 50%;
                }
                </style>

                <img src="${randomUrl}" />

            </body>
            </html>
        `);
        })
        .catch(error => {
            console.error("Error:", error);
            res.status(500).send("Internal Server Error: No Femboys Found");
        });
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
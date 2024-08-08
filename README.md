![FemboyFinder](https://socialify.git.ci/FireStreaker2/FemboyFinder/image?description=1&forks=1&issues=1&logo=https%3A%2F%2Fi.pinimg.com%2F736x%2F50%2F77%2F1f%2F50771f45b1c015cfbb8b0853ba7b8521.jpg&name=1&owner=1&pulls=1&stargazers=1&theme=Dark)

# Info

A simple image querier using express and gelbooru, written with TypeScript.

This project was originally a way to find, as implied by the title, femboys. However, I also realized that since it queries by a tag name, it works for all things. Ex. you can search for not just femboys, but also other anime/manga characters.

# Usage

You can get started by going to `https://femboyfinder.firestreaker2.gq/${query}`, where `${query}` is your input. This will return either an image corresponding with the input, or an error message with a status of 500.

Ex. https://femboyfinder.firestreaker2.gq/astolfo.

# API

FemboyFinder also provides an API for developers to use. At the core, it makes a GET request to the gelbooru api, gets a random link from it, and then sends it to the client within a JSON response.

Base URL: `https://femboyfinder.firestreaker2.gq/api/${query}`

## Example

URL: https://femboyfinder.firestreaker2.gq/api/mihate_hiura

Response:

```json
{
	"error": false,
	"query": "mihate_hiura",
	"url": "https://img3.gelbooru.com/images/2a/2b/2a2b656f0813ab2c29a86c3c69d15852.png",
	"tags": "1boy 2boys banjou_azusa black_hair blush crossdressing flower greyscale_with_colored_background hair_flower hair_ornament highres japanese_clothes kimono koisuru_(otome)_no_tsukurikata limited_palette looking_at_viewer male_focus midou_kenshirou mihate_hiura mixed-language_commentary multiple_boys pantyhose pink_eyes short_hair signature trap",
	"source": "https://www.pixiv.net/artworks/103958957"
}
```

# Selfhosting

If you for some reason would like to selfhost this project, the steps are simple. All you need is to have node and git installed already.

```bash
$ git clone https://github.com/FireStreaker2/FemboyFinder.git
$ cd FemboyFinder
$ npm i
$ npm start
```

## Environment variables

According to the official gelbooru api documentation:

> We will occasionally require authentication to access our API and throttle access to our API. This is to mitigate abusive behavior.

While it is not required to add your API key and user ID to the requests, it is recommended to do so in case there are suddenly rate limits put in place. If you would like to do so, then simply configure the following environment variables:

- `API_KEY`
- `USER_ID`

These can be found from the [settings page](https://gelbooru.com/index.php?page=account&s=options) in gelbooru.

# Contributing

If you would like to contribute, you can <a href="https://github.com/FireStreaker2/FemboyFinder/fork">fork the repo</a> and <a href="https://github.com/FireStreaker2/FemboyFinder/compare">make a PR</a>, or contact me via email @ `suggestions@firestreaker2.gq`

# Credits

<a href="https://gelbooru.com/index.php?page=wiki&s=view&id=18780">Gelbooru API</a>

# License

<a href="https://github.com/FireStreaker2/FemboyFinder/blob/main/LICENSE">MIT</a>

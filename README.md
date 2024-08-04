![FemboyFinder](https://socialify.git.ci/FireStreaker2/FemboyFinder/image?description=1&forks=1&issues=1&logo=https%3A%2F%2Fi.pinimg.com%2F736x%2F50%2F77%2F1f%2F50771f45b1c015cfbb8b0853ba7b8521.jpg&name=1&owner=1&pulls=1&stargazers=1&theme=Dark)

# Info

A simple image querier using bun, express, and gelbooru, written with TypeScript.

This project was originally a way to find, as implied by the title, femboys. However, I also realized that since it queries by a tag name, it works for all things. Ex. you can search for not just femboys, but also other anime/manga characters.

# Usage

You can get started by going to `https://femboyfinder.firestreaker2.gq/${query}`, where `${query}` is your input. This will return either an image corresponding with the input, or an error message with a status of 500.

Ex. https://femboyfinder.firestreaker2.gq/astolfo.

# API

FemboyFinder also provides an API for developers to use. At the core, it makes a GET request to the gelbooru api, gets a random link from it, and then sends it to the client within a JSON response.

Base URL: `https://femboyfinder.firestreaker2.gq/api/${query}`

## Example

URL: https://femboyfinder.firestreaker2.gq/api/felix_argyle

Response:

```json
{
	"error": false,
	"query": "felix_argyle",
	"url": "https://cdn.donmai.us/original/60/28/602891219d1153f991a0bb96c338a29b.jpg",
	"dimensions": "1200x1350"
}
```

# Selfhosting

If you for some reason would like to selfhost this project, the steps are simple. All you need is to have Bun and Git installed already.

```bash
$ git clone https://github.com/FireStreaker2/FemboyFinder.git
$ cd FemboyFinder
$ bun i
$ bun start
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

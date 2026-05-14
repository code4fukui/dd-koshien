# dd-koshien

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This repository provides civic open data for the Summer Digi-den Koshien 2022, an event showcasing digital transformation initiatives by local communities in Japan.

## Demo

-   [List of Entries](https://code4fukui.github.io/dd-koshien/)
-   [List of Video Entries](https://code4fukui.github.io/dd-koshien/movie.html)
-   [List of All Video Entries (Slower Load)](https://code4fukui.github.io/dd-koshien/movie-all.html)

## Civic Open Data

This project scrapes and structures the entry data from the official Summer Digi-den Koshien 2022 website.

-   **Attribution:** "Adapted from [Summer Digi-den Koshien | Cabinet Secretariat Website](https://www.cas.go.jp/jp/seisaku/digital_denen/koushien.html)" (Converted by [Code for FUKUI](https://code4fukui.github.io/))
-   **Available Formats:**
    -   [CSV](data/dd-koshien-2022s.csv)
    -   [JSON](data/dd-koshien-2022s.json)
    -   [CBOR](data/dd-koshien-2022s.cbor)
-   **Data Fields:**
    -   `pref`: Prefecture name
    -   `category`: Entry category
    -   `name`: Name of the initiative
    -   `url`: Link to the entry's PDF document
    -   `src`: Source URL on the Cabinet Secretariat website
    -   `nettvid`: Video ID from `nettv.gov-online.go.jp` (if available)
    -   `movie`: Link to the video page
    -   `image`: Link to the video thumbnail image
    -   `city`: City/Town name from video metadata
    -   `title`: Title from video metadata
    -   `description`: Description from video metadata

## Features

### Automated Data Scraping

The data was collected using a Deno script ([deno/download.js](deno/download.js)) that scrapes the official website. A GitHub Actions workflow ([.github/workflows/scheduled-update.yml](.github/workflows/scheduled-update.yml)) was used to automate this process. Note: The scheduled update is currently disabled as the 2022 event has concluded.

### Video Embedding Component

The repository includes a JavaScript module, [createNetTV.js](createNetTV.js), for easily embedding videos from Japan's government internet TV service, [nettv.gov-online.go.jp](https://nettv.gov-online.go.jp/).

```javascript
import { createNetTV } from "./createNetTV.js";

// Use the 'nettvid' from the dataset
const videoPlayer = createNetTV("24726");
document.body.appendChild(videoPlayer);
```

## License

MIT License — see [LICENSE](LICENSE).
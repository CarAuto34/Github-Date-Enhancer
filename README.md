# GitHub Date Enhancer

[![CodSpeed](https://img.shields.io/endpoint?url=https://codspeed.io/badge.json)](https://app.codspeed.io/CarAuto34/Github-Date-Enhancer?utm_source=badge)

Shows exact creation and commit dates alongside relative times on GitHub.

## Features
- Displays the full, absolute date (e.g., "Apr 27, 2024") next to relative times (e.g., "3 days ago") on issues, pull requests, commits, and more.
- Works automatically on all GitHub pages.
- No configuration required.
- All processing is done locally—no data is sent anywhere.

## How it works
The extension scans GitHub pages for relative time elements and adds the corresponding absolute date next to them. It updates automatically as you navigate or as new content loads.

## Installation
### Firefox
- Download the latest release ZIP from the [releases page](https://github.com/myst-25/github-date-enhancer/releases).
- Go to `about:addons` > "Install Add-on From File..." and select the ZIP file.

### Chrome
- Download the latest release ZIP from the [releases page](https://github.com/myst-25/github-date-enhancer/releases).
- Go to `chrome://extensions/`, enable Developer Mode, click "Load unpacked", and select the extension folder.

## Benchmarks
Performance benchmarks for the content scripts live in `bench/` and use [Vitest](https://vitest.dev) with the [CodSpeed](https://codspeed.io) plugin. Run them locally with:

```sh
npm install
npm run bench
```

## Permissions
- Requires access to github.com pages to display the enhanced dates.

## License
MIT License. See [LICENSE](LICENSE) for details. 

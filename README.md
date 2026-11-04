# Languish &mdash; Programming Language Trends (GitHub Innovation Graph fork)

**Live site:** https://thanks2music.github.io/languish/

This is a fork of [tjpalmer/languish](https://github.com/tjpalmer/languish). The upstream site stopped at 2025Q2. This fork plots official GitHub data from the [GitHub Innovation Graph](https://github.com/github/innovationgraph) instead, so it can be kept current.

## Why this fork changed data sources

- **GH Archive**, which upstream used for GitHub stars, pull requests, and issues, has been losing events since 2025-05-24, and by 2026 it captures only a fraction of public activity (see [igrigorik/gharchive.org#320](https://github.com/igrigorik/gharchive.org/issues/320) and [#326](https://github.com/igrigorik/gharchive.org/issues/326)).
- **Stack Overflow** now gets only about a thousand new questions a month, so its tag counts no longer reflect language use.

## The metric

The y axis is **GitHub Pushers**: each language's share of the quarter's total, where a language's count is the number of unique developers who made at least one `git push` to a public repository containing that language ([datasheet](https://github.com/github/innovationgraph/blob/main/docs/datasheet.md)). Counts are summed over all economies in `data/languages.csv`. Only languages that GitHub Linguist classifies as `programming` or `markup` are included.

Read it with these caveats:

- A repository counts for **every** language it contains, not just its main one. Languages common in supporting files, such as HTML, CSS, Shell, Dockerfile, and Makefile, rank high, and JavaScript ranks above TypeScript. Rankings by contributors, such as [GitHub Octoverse](https://github.blog/news-insights/octoverse/), can differ.
- Data starts in **2020Q1**. Earlier quarters are not available.
- GitHub withholds figures for economies with fewer than 100 developers in a quarter, so totals slightly undercount.
- New quarters are published about four months after the quarter ends.

## Updating the data

```sh
bun install
bun run update-data   # downloads languages.csv and rewrites scripts/data/gh-pushers.json
bun run build         # or `bun run start` for a dev server
```

Commit the updated `scripts/data/gh-pushers.json`. Merging to `main` deploys the site to GitHub Pages.

## Features

- Measures current activity per quarter rather than total past mass
- Linear or log y axis
- Links to GitHub topics and trending repositories by language
- Permalinks to the selected languages and scale

## Credits

- Original project: [Languish](https://github.com/tjpalmer/languish) by Tom Palmer (ISC license, see [LICENSE](LICENSE))
- Data: [GitHub Innovation Graph](https://github.com/github/innovationgraph) (CC0-1.0)
- Icons from [Feather Icons](https://feathericons.com/) and [Font Awesome](https://fontawesome.com/), via [IcoMoon](https://icomoon.io/)
- Other dependencies are listed in package.json; see their respective licenses

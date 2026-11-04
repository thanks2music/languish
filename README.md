# Languish &mdash; Programming Language Trends (GitHub Innovation Graph fork)

**Live site:** https://thanks2music.github.io/languish/

This is a fork of [tjpalmer/languish](https://github.com/tjpalmer/languish). The upstream site stopped at 2025Q2. This fork plots official GitHub data from the [GitHub Innovation Graph](https://github.com/github/innovationgraph) instead, so it can be kept current.

## Why this fork changed data sources

- **GH Archive**, which upstream used for GitHub stars, pull requests, and issues, has been losing events since late May 2025, and by 2026 it captures only a fraction of public activity (see [igrigorik/gharchive.org#310](https://github.com/igrigorik/gharchive.org/issues/310), [#320](https://github.com/igrigorik/gharchive.org/issues/320), and [#326](https://github.com/igrigorik/gharchive.org/issues/326)).
- **Stack Overflow** now gets only about a thousand new questions a month, so its tag counts no longer reflect language use.

## The metric

The y axis is **GitHub Pushers**. A language's count is the number of unique developers who made at least one `git push` to a public repository containing that language ([datasheet](https://github.com/github/innovationgraph/blob/main/docs/datasheet.md)), summed over the economies in `data/languages.csv`. The `EU` rows are left out because each one is the sum of the 27 member states, which are also listed. Only languages classified as `programming` or `markup` are included.

The plotted value is each language's count as a percentage of all languages' counts that quarter. A developer who pushes to repositories in several languages is counted once for each, so the denominator is not the number of developers.

Read it with these caveats:

- A repository counts for **every** language it contains, not just its main one. Languages common in supporting files, such as HTML, CSS, Shell, Dockerfile, and Makefile, rank high, and JavaScript ranks above TypeScript. Rankings by contributors, such as [GitHub Octoverse](https://github.blog/news-insights/octoverse/), can differ.
- Data starts in **2020Q1**. Earlier quarters are not available.
- GitHub withholds a figure when fewer than 100 developers in an economy pushed to that language in the quarter, so small languages are undercounted the most.
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

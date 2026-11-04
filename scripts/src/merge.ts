// Converts scripts/data/gh-pushers.json into the table format that the app
// imports as src/data.json. Run by `bun run merge` before start and build.

import { readFileSync } from "fs";
import { join } from "path";
import type { Count } from "./update-data";

interface Item {
  name: string;
  date: string;
  pushers: number;
}

interface Sum {
  date: string;
  pushers: number;
}

function main() {
  const counts = JSON.parse(
    readFileSync(join(import.meta.dir, "../data/gh-pushers.json"), "utf8")
  ) as Count[];
  const items: Item[] = counts.map((count) => ({
    name: count.name,
    date: `${count.year}Q${count.quarter}`,
    pushers: count.count,
  }));
  const sums = new Map<string, Sum>();
  for (const item of items) {
    const sum = sums.get(item.date) ?? { date: item.date, pushers: 0 };
    sum.pushers += item.pushers;
    sums.set(item.date, sum);
  }
  const sortedSums = [...sums.values()].sort((a, b) =>
    a.date.localeCompare(b.date)
  );
  console.log(
    JSON.stringify({ items: tablify(items), sums: tablify(sortedSums) })
  );
}

function tablify<Item extends object>(items: Item[]) {
  const keys = Object.keys(items[0]) as (keyof Item)[];
  return { keys, rows: items.map((item) => keys.map((key) => item[key])) };
}

main();

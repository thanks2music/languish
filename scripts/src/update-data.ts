// Downloads GitHub Innovation Graph language data and writes per-language
// quarterly totals to scripts/data/gh-pushers.json.
//
// Source: https://github.com/github/innovationgraph (CC0-1.0)
// Metric: the number of unique developers who pushed at least once to a
// repository containing the language, summed over all reported economies.
//
// Usage: bun run update-data

import { writeFileSync } from "fs";
import { join } from "path";

const sourceUrl =
  "https://raw.githubusercontent.com/github/innovationgraph/main/data/languages.csv";
const outputPath = join(import.meta.dir, "../data/gh-pushers.json");
const includedTypes = new Set(["programming", "markup"]);
const expectedHeader = "num_pushers,language,language_type,iso2_code,year,quarter";

export interface Count {
  name: string;
  year: number;
  quarter: number;
  count: number;
}

export function aggregate(csv: string): Count[] {
  const lines = csv.trim().split(/\r?\n/);
  if (lines[0] !== expectedHeader) {
    throw new Error(`Unexpected CSV header: ${lines[0]}`);
  }
  const totals = new Map<string, Count>();
  for (const line of lines.slice(1)) {
    const fields = parseCsvLine(line);
    if (fields.length !== 6) {
      throw new Error(`Unexpected CSV row: ${line}`);
    }
    const [pushers, name, type, , year, quarter] = fields;
    if (!includedTypes.has(type)) continue;
    const key = `${name}\t${year}\t${quarter}`;
    let total = totals.get(key);
    if (!total) {
      total = { name, year: Number(year), quarter: Number(quarter), count: 0 };
      totals.set(key, total);
    }
    total.count += Number(pushers);
  }
  return [...totals.values()].sort(
    (a, b) =>
      a.year - b.year || a.quarter - b.quarter || b.count - a.count ||
      a.name.localeCompare(b.name)
  );
}

// Language names can contain commas (none do today, but quoting is legal).
function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (quoted) {
      if (char === '"' && line[i + 1] === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      fields.push(field);
      field = "";
    } else {
      field += char;
    }
  }
  fields.push(field);
  return fields;
}

async function main() {
  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Download failed: ${response.status} ${sourceUrl}`);
  }
  const counts = aggregate(await response.text());
  writeFileSync(outputPath, JSON.stringify(counts, null, 2) + "\n");

  const last = counts[counts.length - 1];
  const latest = counts.filter(
    (count) => count.year === last.year && count.quarter === last.quarter
  );
  console.log(`Wrote ${counts.length} rows to ${outputPath}`);
  console.log(
    `Quarters: ${counts[0].year}Q${counts[0].quarter} to ${last.year}Q${last.quarter}`
  );
  console.log(`Languages in ${last.year}Q${last.quarter}: ${latest.length}`);
  console.log("Top 10:");
  for (const count of latest.slice(0, 10)) {
    console.log(`  ${count.name}: ${count.count}`);
  }
}

if (import.meta.main) {
  await main();
}

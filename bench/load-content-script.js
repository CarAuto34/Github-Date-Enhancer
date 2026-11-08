import { readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

/**
 * Loads one of the extension content scripts (which are plain, non-module
 * browser scripts) into the current jsdom environment and returns its
 * internal functions so they can be benchmarked without modifying the
 * extension source.
 *
 * The MutationObserver created by the script is disconnected right away so
 * that it does not fire asynchronously during the benchmarks.
 */
export function loadContentScript(browserDir) {
  const source = readFileSync(join(ROOT, browserDir, "content.js"), "utf8");
  const factory = new Function(
    "document",
    "MutationObserver",
    `${source}\nreturn { enhanceDates, formatDate, observer };`,
  );
  const api = factory(document, MutationObserver);
  api.observer.disconnect();
  return api;
}

const START = Date.UTC(2015, 0, 1);
const STEP = 37 * 60 * 60 * 1000 + 13 * 60 * 1000;

/** Deterministic list of ISO timestamps. */
export function makeIsoDates(count) {
  const dates = new Array(count);
  for (let i = 0; i < count; i++) {
    dates[i] = new Date(START + i * STEP).toISOString();
  }
  return dates;
}

/**
 * Builds markup resembling a GitHub listing page (e.g. the file browser or
 * a commit list), with one <relative-time> element per row.
 */
export function makeGithubPageHtml(rows) {
  const dates = makeIsoDates(rows);
  let html = '<div class="Box"><table><tbody>';
  for (let i = 0; i < rows; i++) {
    html +=
      `<tr class="react-directory-row"><td><a href="/o/r/blob/main/file${i}.js">file${i}.js</a></td>` +
      `<td><a href="/o/r/commit/${i}">Commit message ${i}</a></td>` +
      `<td><relative-time datetime="${dates[i]}" class="no-wrap">${i} days ago</relative-time></td></tr>`;
  }
  html += "</tbody></table></div>";
  return html;
}

/** Resets the jsdom document to a fresh GitHub-like page. */
export function resetPage(rows) {
  document.getElementById("gh-date-styles")?.remove();
  document.body.innerHTML = makeGithubPageHtml(rows);
}

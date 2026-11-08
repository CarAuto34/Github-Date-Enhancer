import { describe, test } from "vitest";
import {
  loadContentScript,
  makeIsoDates,
  resetPage,
} from "./load-content-script.js";

// The extension ships two content script variants with different
// implementations, so both are benchmarked.
const variants = [
  ["chrome", "Chorme & all"],
  ["firefox", "Firefox"],
];

const isoDates = makeIsoDates(200);

for (const [name, dir] of variants) {
  const { enhanceDates, formatDate } = loadContentScript(dir);

  describe(`${name} content script`, () => {
    test("formatDate", async ({ bench }) => {
      await bench("200 ISO dates", () => {
        for (let i = 0; i < isoDates.length; i++) {
          formatDate(isoDates[i]);
        }
      }).run();
    });

    test("enhanceDates", async ({ bench }) => {
      await bench.compare(
        bench(
          "page with 50 dates",
          { beforeEach: () => resetPage(50) },
          () => {
            enhanceDates();
          },
        ),
        bench(
          "page with 500 dates",
          { beforeEach: () => resetPage(500) },
          () => {
            enhanceDates();
          },
        ),
        bench(
          "already enhanced page with 500 dates",
          {
            beforeAll: () => {
              resetPage(500);
              enhanceDates();
            },
          },
          () => {
            enhanceDates();
          },
        ),
      );
    });
  });
}

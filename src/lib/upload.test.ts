import { expect, test } from "vitest";

import { calculateAspectRatioFit } from "@/lib/upload";

test.each([
  [
    { originWidth: 3000, originHeight: 820, maxWidthOrHeight: 1280 },
    { width: 1280, height: 349.9 },
  ],
  [
    { originWidth: 1280, originHeight: 1303, maxWidthOrHeight: 1280 },
    { width: 1257.4, height: 1280 },
  ],
  [
    { originWidth: 2403, originHeight: 603, maxWidthOrHeight: 1280 },
    { width: 1280, height: 321.2 },
  ],
  [
    { originWidth: 1200, originHeight: 820, maxWidthOrHeight: 1280 },
    { width: 1200, height: 820 },
  ],
  [
    { originWidth: 200, originHeight: 200, maxWidthOrHeight: 1280 },
    { width: 200, height: 200 },
  ],
])("calculateAspectRatioFit(%o) returns %o", ({ originWidth, originHeight, maxWidthOrHeight }, expected) => {
  const result = calculateAspectRatioFit({
    width: originWidth,
    height: originHeight,
    maxLength: maxWidthOrHeight,
  });

  expect(result).toEqual(expected);
});

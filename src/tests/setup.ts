import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
global.React = require("react");

// Mocking cleanup
beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});
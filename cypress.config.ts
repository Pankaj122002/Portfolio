import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4173",
    supportFile: false,
    pageLoadTimeout: 120000,

  },
});

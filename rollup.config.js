import {terser} from "rollup-plugin-terser";
import path from "path";
import packageJson from "./package.json";
import remove from "rollup-plugin-delete";

export default {
  input: path.resolve("sources", "main.mjs"),
  plugins: [
    remove({
      targets: [
        path.resolve("common.js"),
        path.resolve("module.js"),
        path.resolve("browser.js")
      ]
    }),
    terser()
  ],
  output: [
    {
      file: path.resolve("common.js"),
      format: "cjs"
    },
    {
      file: path.resolve("module.js"),
      format: "esm"
    },
    {
      file: path.resolve("browser.js"),
      format: "iife",
      name: packageJson.name,
      extend: true
    }
  ]
};

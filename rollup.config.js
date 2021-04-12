import {terser} from "rollup-plugin-terser";
import path from "path";
import packageJson from "./package.json";
import remove from "rollup-plugin-delete";

export default {
  input: path.resolve("sources", "main.mjs"),
  plugins: [
    remove({
      targets: [
        path.resolve("release", "**", "*")
      ]
    }),
    terser()
  ],
  output: [
    {
      file: path.resolve("release", "common.js"),
      format: "cjs"
    },
    {
      file: path.resolve("release", "module.js"),
      format: "esm"
    },
    {
      file: path.resolve("release", "browser.js"),
      format: "iife",
      name: packageJson.name,
      extend: true
    }
  ]
};

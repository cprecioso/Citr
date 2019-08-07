import dts from "rollup-plugin-dts"
import typescript from "rollup-plugin-typescript2"

/** @type {import("rollup").RollupOptions[]} */
const options = [
  {
    input: "lib/citr.ts",
    output: [
      { file: "dist/citr.js", format: "cjs" },
      { file: "dist/citr.es.js", format: "esm" }
    ],
    plugins: [
      typescript({
        typescript: require("typescript"),
        cacheRoot: "node_modules/.cache/rpts2"
      })
    ]
  },
  {
    input: "lib/citr.ts",
    output: { file: "dist/citr.d.ts", format: "esm" },
    plugins: [dts()]
  }
]
export default options

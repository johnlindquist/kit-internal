import { readdir, writeFile } from "fs/promises"
import { rollup } from "rollup"
import typescript from "@rollup/plugin-typescript"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import { terser } from "rollup-plugin-terser"

// let files = await readdir("./src")
// files = files.filter(f => f !== "index.ts")

// let entryFileContent = `
// ${files
//   .map(f => `export * from "./${f.replace(/\.ts$/, "")}"`)
//   .join("\n")}
// `
// await writeFile("./src/index.ts", entryFileContent)

let bundle = await rollup({
  input: "./src/index.ts",
  treeshake: true,

  plugins: [
    typescript(),
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    terser(),
  ],
})

await bundle.write({
  file: "./dist/index.js",
  format: "esm",
  compact: true,
})

await bundle.close()

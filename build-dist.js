import { readdir, writeFile } from "fs/promises"
import { rollup } from "rollup"
import typescript from "@rollup/plugin-typescript"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import { terser } from "rollup-plugin-terser"

let entries = await readdir("./src")

for (let entry of entries) {
  let name = entry.replace(/\.ts$/, "")
  let bundle = await rollup({
    input: `./src/${entry}`,
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
    file: `./dist/${name}.js`,
    format: "esm",
    compact: true,
  })

  await bundle.write({
    file: `./dist/${name}.cjs`,
    format: "cjs",
    compact: true,
  })

  await bundle.close()
}

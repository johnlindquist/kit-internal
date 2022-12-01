import { readdir } from "fs/promises"
import { rollup } from "rollup"
import typescript from "@rollup/plugin-typescript"
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import { terser } from "rollup-plugin-terser"

let entries = await readdir("./src")

console.log(`Entries: ${entries}`)

for await (let entry of entries) {
  console.log(`Generating dist for ${entry}`)
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

  console.log(`Writing dist to ./dist/${name}.js`)
  await bundle.write({
    file: `./dist/${name}.js`,
    format: "esm",
    compact: true,
  })

  console.log(`Writing dist to ./dist/${name}.cjs`)
  await bundle.write({
    file: `./dist/${name}.cjs`,
    format: "cjs",
    compact: true,
  })

  await bundle.close()

  console.log(`${name} bundle complete`)
}

console.log(`✅ Done building dist`)
process.exit(0)

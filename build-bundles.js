import { readdir, writeFile } from "fs/promises"
import esbuild from "esbuild"

// let bundles = await readdir("./src")

// for (let bundle of bundles) {
//   esbuild.buildSync({
//     entryPoints: [`./src/${bundle}`],
//     treeShaking: true,
//     bundle: true,
//     format: "esm",
//     outfile: `./dist/${bundle}`.replace(/\.ts$/, ".js"),
//     minify: true,
//     tsconfig: "./tsconfig.json",
//   })
// }

let files = await readdir("./src")
files = files.filter(f => f !== "index.ts")

let entryFileContent = `
${files
  .map(f => `export * from "./${f.replace(/\.ts$/, "")}"`)
  .join("\n")}
`
await writeFile("./src/index.ts", entryFileContent)

esbuild.buildSync({
  entryPoints: [`./src/index.ts`],
  treeShaking: true,
  platform: "node",
  bundle: true,
  format: "esm",
  outfile: `./dist/index.js`,
  minify: true,
  tsconfig: "./tsconfig.json",
  external: ["electron"],
})

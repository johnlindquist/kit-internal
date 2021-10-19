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
  .filter(f => !f.includes("axios"))
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

  outdir: "./dist",
  // minify: true,
  tsconfig: "./tsconfig.json",
  external: ["electron"],
  target: ["node14.8"],
})

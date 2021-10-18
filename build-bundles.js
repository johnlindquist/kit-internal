import { readdir } from "fs/promises"
import esbuild from "esbuild"

let bundles = await readdir("./src")

for (let bundle of bundles) {
  esbuild.buildSync({
    entryPoints: [`./src/${bundle}`],
    treeShaking: true,
    bundle: true,
    format: "esm",
    outfile: `./bundles/${bundle}`.replace(/\.ts$/, ".js"),
  })
}

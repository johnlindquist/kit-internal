import { readdir, writeFile, mkdir } from "fs/promises"
import d from "dts-bundle-generator"

let compilationOptions = {
  preferredConfigPath: "./tsconfig.json",
}

let output = {
  inlineDeclareGlobals: true,
  inlineDeclareExternals: true,
  sortNodes: true,
  exportReferencedTypes: true,
}

await mkdir("./types")
let entries = await readdir("./src")

for (let entry of entries) {
  console.log(`Generating types for ${entry}`)
  let outFile = `./types/${entry.replace(/\.ts$/, ".d.ts")}`
  let entries = [
    {
      filePath: `./src/${entry}`,
      outFile,
      noCheck: true,
      output,

      libraries: {
        inlinedLibraries: [entry.replace(/\.ts$/, "")],
      },
    },
  ]
  let content = d.generateDtsBundle(entries, compilationOptions)
  console.log(`Writing types to ${outFile}`)
  await writeFile(outFile, content)
}

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

// only create the ./types dir if it doesn't exist
await mkdir("./types", { recursive: true })

let entries = await readdir("./src")

console.log(`Entries: ${entries}`)

for await (let entry of entries) {
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
  await writeFile(outFile, content)
  console.log(`${entry} types complete`)
}

console.log(`Done building types`)

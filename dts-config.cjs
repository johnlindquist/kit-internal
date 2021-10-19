// @ts-check

// If won't use `@ts-check` - just remove that comments (with `@type` JSDoc below).
const { readdirSync } = require("fs")

/** @type import('dts-bundle-generator/config-schema').OutputOptions */
const commonOutputParams = {
  inlineDeclareGlobals: true,
  inlineDeclareExternals: true,
  sortNodes: true,
}

/** @type import('dts-bundle-generator/config-schema').BundlerConfig */
const config = {
  compilationOptions: {
    preferredConfigPath: "./tsconfig.json",
  },

  entries: [
    {
      filePath: "./src/index.ts",
      outFile: "./types/index.d.ts",
      noCheck: true,
      output: commonOutputParams,

      libraries: {
        inlinedLibraries: readdirSync("./src")
          .filter(p => !p.startsWith("index"))
          .map(p => p.replace(/\.ts$/, "")),
      },
    },
  ],
}

module.exports = config
